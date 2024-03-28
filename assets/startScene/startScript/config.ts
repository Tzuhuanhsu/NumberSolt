import * as cc from "cc";
//定義Config
export interface IConfig
{
    HotBundle: string
    HotScene: string
    GameScene: string
    Environment: string
    GameBundle: string
    GameBundles: []
    VerCode: string,
    Server: {},
    Patch: boolean
}
export const ServerName =
{
    Mater: "Mater",
    Summary: "Summary",
    Bundle: "Bundle"
}
export default class config
{
    private gameVersion: string = "0.0.0";
    private static instance = null;
    private configData: IConfig;
    private constructor () { }

    static getInstance(): config
    {
        if (this.instance == null)
        {
            this.instance = new config();
        }
        return this.instance;
    }

    updateGameVersion(version: string)
    {
        this.gameVersion = version;
    }

    getGameVersion(): string
    {
        return this.gameVersion;
    }

    set Config(config: cc.JsonAsset)
    {
        try
        {
            this.configData = config.json as IConfig

        }
        catch (err)
        {
            console.log("config setConfig error", err);
        }
    }
    get Config(): IConfig
    {
        return this.configData;
    }
}