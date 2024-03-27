import { _decorator, Component, Node, Label, Button } from 'cc';
import * as cc from "cc";
import config from '../../startScene/startScript/config';
import bundleHelp from '../../startScene/startScript/bundleHelp';
const { ccclass, property } = _decorator;
@ccclass('hotScript')
export class hotScript extends Component
{
    @property(Label) stateLabel: Label;
    @property(Label) verCodeLabel: Label;
    start()
    {
        this.setState(`需要載入的Bundle = (0/${config.getInstance().Config.GameBundles.length})`);
        this.verCodeLabel.string = config.getInstance().Config.VerCode;
    }
    setState(state: string)
    {
        this.stateLabel.string = state;
    }
    async onClick()
    {
        await this.loadNextBundle();
    }
    private async loadNextBundle()
    {
        if (bundleHelp.getInstance().getGameBundleSize() == config.getInstance().Config.GameBundles.length)
        {
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
        if (config.getInstance().Config.Patch == true)
        {
            bundleHelp.getInstance().loadLocalSummary();
            await bundleHelp.getInstance().loadRemoteSummary();
        }

        config.getInstance().Config.GameBundles.forEach(bundle =>
        {
            console.log("Bundle", bundle, bundleHelp.getInstance().getBundleMd5(bundle));
            const options = { version: bundleHelp.getInstance().getBundleMd5(bundle) };
            const bundlePath = bundleHelp.getInstance().getBundlePath(bundle);
            bundleHelp.getInstance().loadBundle(bundlePath, options, (err: Error, data: cc.AssetManager.Bundle) =>
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

