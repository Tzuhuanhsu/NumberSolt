import { _decorator, Component, Node } from 'cc';
import * as cc from "cc";
import { reelMgr } from './reelMgr';
const { ccclass, property } = _decorator;

@ccclass('gameMgr')
export class gameMgr extends Component
{
    @property(cc.Button) spinButton: cc.Button;
    @property(reelMgr) reelMgr: reelMgr;
    start()
    {
        this.spinButton.node.on(cc.Button.EventType.CLICK, this._onSpin, this);
        this.reelMgr.initReel();
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

