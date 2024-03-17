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
}

export default class config
{
    private gameBundleSize: number = 0;
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