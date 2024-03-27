import * as cc from "cc";
import config, { ServerName } from "./config";

const BUNDLE_MAP_INDEX = 0;
const BUNDLE_OPTION_INDEX = 1;
const BUNDLE_STORAGE_KEY = "BUNDLE_STORAGE_KEY";
export default class bundleHelp 
{
    private gameBundleSize: number = 0;
    private static instance: bundleHelp = null;
    private constructor () { }
    private loadedBundle: Map<string, cc.AssetManager.Bundle> = new Map();
    private bundleMd5 = {}
    private remoteMd5 = {};
    static getInstance(): bundleHelp
    {
        if (this.instance == null)
        {
            this.instance = new bundleHelp();
        }
        return this.instance;
    }


    addGameBundleSize()
    {
        this.gameBundleSize += 1;
    }
    reduceGameBundleSize()
    {
        this.gameBundleSize -= 1;
    }

    getGameBundleSize(): number
    {
        return this.gameBundleSize;
    }
    //載入本地端的summary
    loadLocalSummary()
    {
        const storageMd5 = cc.sys.localStorage.getItem(BUNDLE_STORAGE_KEY);
        this.bundleMd5 = JSON.parse(storageMd5);
    }
    //載入遠端的summary
    async loadRemoteSummary()
    {
        try
        {
            const Url = config.getInstance().Config.Server[ServerName.Mater] + config.getInstance().Config.Server[ServerName.Summary];
            this.remoteMd5 = (await this.requestRemoteSummary(Url)).json;
        }
        catch (err)
        {
            console.error("loadRemoteSummary error", err);
        }

    }

    private requestRemoteSummary(url: string): Promise<cc.JsonAsset>
    {
        return new Promise<cc.JsonAsset>(function (resolve, reject)
        {
            cc.assetManager.loadRemote(url,
                { reload: true, cacheAsset: false, cacheEnabled: false, ext: ".json" },
                (err: Error, data: cc.JsonAsset) =>
                {
                    console.log("data", data);
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {

                        resolve(data);
                    }

                });
        });
    }

    loadBundle(nameOrUrl: string,
        options:
            {
                [k: string]: any;
                version?: string;
            } | null,
        onComplete?: ((err: Error | null, data: cc.AssetManager.Bundle) => void) | null)
    {
        cc.assetManager.loadBundle(nameOrUrl, options, async (err: Error, bundle: cc.AssetManager.Bundle) =>
        {
            if (!err)
            {
                this.addGameBundleSize();
                this.loadedBundle.set(bundle.name, bundle);
                this.setStorageBundleVersion(bundle.name, options?.version);
            }

            onComplete(err, bundle);
        });

    }
    //取得 bundle的 版本號
    getBundleMd5(bundleName: string): string
    {
        if (config.getInstance().Config.Patch == false || this.remoteMd5[bundleName] == this.bundleMd5[bundleName])
        {
            return null;
        }
        else (this.remoteMd5[bundleName] != this.bundleMd5[bundleName])
        {
            //遠地端，跟本地端的 Md5 不同，以遠端的 Md5 為主
            return this.remoteMd5[bundleName];
        }

    }

    //載入指定的 Bundle
    getBundlePath(bundleName: string)
    {
        if (this.remoteMd5[bundleName] == this.bundleMd5[bundleName] || config.getInstance().Config.Patch == false)
        {
            //遠端跟本地端的版本號相同 or 沒有開啟 Patch
            //直接回傳 bundle name 不用 Patch
            return bundleName;
        }
        else
        {
            //need patch
            return config.getInstance().Config.Server[ServerName.Mater] +
                config.getInstance().Config.Server[ServerName.Bundle] +
                bundleName;
        }

    }

    getMainGameBundle(): cc.AssetManager.Bundle
    {
        return this.loadedBundle.get(config.getInstance().Config.GameBundle);
    }

    private setStorageBundleVersion(bundleName: string, version: string)
    {
        this.bundleMd5[bundleName] = version ?? "";
        cc.sys.localStorage.setItem(BUNDLE_STORAGE_KEY, JSON.stringify(this.bundleMd5))
    }
}