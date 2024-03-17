import { _decorator, Component, Node } from 'cc';
import * as cc from "cc";
import config from './config';
const { ccclass, property } = _decorator;


@ccclass('startScene')
export class startScene extends Component
{
    @property(cc.JsonAsset) configJson: cc.JsonAsset;

    private isLoading: boolean = false;
    start()
    {
        console.log("Start Scene Running");
        config.getInstance().Config = this.configJson;
    }
    //按鈕觸發事件
    async buttonClick()
    {
        if (this.isLoading == true)
            return;
        this.isLoading = true;
        await this.loadNextScene();
    }

    private async loadNextScene()
    {
        console.log("loading next scene");

        try
        {
            cc.assetManager.loadBundle(config.getInstance().Config.HotBundle,
                null,
                ((err: Error | null, data: cc.AssetManager.Bundle) =>
                {
                    if (err)
                    {
                        return;
                    }
                    data.loadScene(config.getInstance().Config.HotScene, null, (err: Error, data: cc.SceneAsset) =>
                    {
                        if (err)
                        {
                            return;
                        }
                        cc.director.runScene(data);
                    });

                }));
        }
        catch (err)
        {
            console.log("loadingNextScene error", err);
        }
    }
}

