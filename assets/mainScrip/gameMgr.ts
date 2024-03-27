import { _decorator, Component, Node } from 'cc';
import * as cc from "cc";
import { reelMgr } from './reelMgr';
import config from '../startScene/startScript/config';
const { ccclass, property } = _decorator;
const version: string = "1.0.1";
@ccclass('gameMgr')
export class gameMgr extends Component
{
    @property(cc.Button) spinButton: cc.Button;
    @property(reelMgr) reelMgr: reelMgr;
    @property(cc.Label) versionLabel: cc.Label;
    start()
    {
        this.spinButton.node.on(cc.Button.EventType.CLICK, this._onSpin, this);
        this.reelMgr.initReel();
        this.versionLabel.string = "Ver:" + version;
        config.getInstance().updateGameVersion(version);
    }

    update(deltaTime: number)
    {
        this.reelMgr.onUpdate(deltaTime);
    }

    private _onSpin()
    {
        this.reelMgr.startSpin();
    }
}

