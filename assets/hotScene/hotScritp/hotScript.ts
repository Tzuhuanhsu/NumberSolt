import { _decorator, Component, Node, Label, Button } from 'cc';
import * as cc from "cc";
import config from '../../startScene/startScript/config';
import bundleHelp from '../../startScene/startScript/bundleHelp';
const { ccclass, property } = _decorator;

@ccclass('hotScript')
export class hotScript extends Component
{
    @property(Label) stateLabel: Label;

    start()
    {
        this.setState(`需要載入的Bundle = (0/${config.getInstance().Config.GameBundles.length})`);
    }
    setState(state: string)
    {
        this.stateLabel.string = state;
    }
    onClick()
    {
        this.loadNextBundle();
    }
    private loadNextBundle()
    {
        if (bundleHelp.getInstance().getGameBundleSize() == config.getInstance().Config.GameBundles.length)
        {
            console.log("getGameBundleSize");
            bundleHelp.getInstance().getMainGameBundle().loadScene(config.getInstance().Config.GameScene, null, (err: Error, scene: cc.SceneAsset) =>
            {
                if (err)
                {
                    this.setState(`載入的Main game Bundle error= (${err.message})`);
                }
                else
                {
                    cc.director.runScene(scene);
                }

            });

            return;
        }
        config.getInstance().Config.GameBundles.forEach(bundle =>
        {
            console.log("Bundle", bundle);
            bundleHelp.getInstance().loadBundle(bundle, null, (err: Error, data: cc.AssetManager.Bundle) =>
            {
                if (err)
                {
                    this.setState(`載入的Bundle error= (${err.message})`);
                }
                this.setState(`需要載入的Bundle = (${bundleHelp.getInstance().getGameBundleSize()}/${config.getInstance().Config.GameBundles.length})`);
            });

        });
    }
    private onNextScene()
    {

    }
}

