import * as cc from "cc";
import config from "./config";


export default class bundleHelp 
{
    private gameBundleSize: number = 0;
    private static instance: bundleHelp = null;
    private constructor () { }
    private loadedBundle: Map<string, cc.AssetManager.Bundle> = new Map();

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

    loadBundle(nameOrUrl: string,
        options:
            {
                [k: string]: any;
                version?: string;
            } | null,
        onComplete?: ((err: Error | null, data: cc.AssetManager.Bundle) => void) | null)
    {
        cc.assetManager.loadBundle(nameOrUrl, options, (err: Error, bundle: cc.AssetManager.Bundle) =>
        {
            if (!err)
            {
                this.addGameBundleSize();
                this.loadedBundle.set(bundle.name, bundle);
            }

            onComplete(err, bundle);
        });

    }

    getMainGameBundle(): cc.AssetManager.Bundle
    {
        return this.loadedBundle.get(config.getInstance().Config.GameBundle);
    }
}