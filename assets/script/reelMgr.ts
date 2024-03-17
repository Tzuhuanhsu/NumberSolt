import * as cc from "cc";
import { symbolComp } from "./symbolComp";
import { gameDefine } from "./gameDefine";
import StateMachine from "./util/stateMachine";
import mallProto from "./proto/test.js";


const { ccclass, property } = cc._decorator;
//轉輪行數
const SYMBOL_COLUMN = 3;
//轉輪 row
const SYMBOL_ROW = 3;
//轉輪起始速度
const REEL_BEGIN_SPEED = 10;
//spin 狀態
enum SPIN_STATE
{
    IDLE,
    SPIN,
    STOP,
    CHECK_AWARD,
    END,

}


@ccclass("reelMgr")
export class reelMgr extends cc.Component
{
    @property(cc.CCInteger) symbolInterval: number = 0;
    @property(cc.CCInteger) symbolMoveLength: number = 0;
    @property(cc.CCInteger) spinEndTime: number = 0;
    @property(cc.CCInteger) spinMaxSpeed: number = 0;
    @property([cc.Node]) reelMask: cc.Node[] = new Array<cc.Node>();
    @property(cc.Prefab) symbol: cc.Prefab;
    private symbols: symbolComp[][] = [[]];
    private symbolData: string[][] = [[]];
    private spinTime: number = 0;
    private spinBeginSpeed: number = 0;
    private spinState: StateMachine<SPIN_STATE> = new StateMachine(SPIN_STATE.IDLE);
    private symbolChangeFlag: boolean = false;
    start()
    {

        console.log("PBClass", mallProto.mallProto.MallReq);
        for (let row = 0; row < this.reelMask.length; row++)
        {
            this.reelMask[row].removeAllChildren();
            for (let col = 0; col < 3; col++)
            {
                const symbolNode = cc.instantiate(this.symbol);
                this.reelMask[row].addChild(symbolNode);
                symbolNode.setPosition(cc.v3(symbolNode.position.x + (this.symbolInterval * col) - this.symbolInterval, 0));
                if (this.symbols[row] == null)
                    this.symbols[row] = [];
                this.symbols[row].push(symbolNode.getComponent(symbolComp));
            }
        }
        this.initFSMState();

    }
    //初始化狀態機
    initFSMState()
    {
        this.spinState.SetEventFunction(SPIN_STATE.SPIN, this.onSpin.bind(this));
        this.spinState.SetEventFunction(SPIN_STATE.STOP, this.onStopSpin.bind(this));
        this.spinState.SetEnterEventFunction(SPIN_STATE.CHECK_AWARD, this.onCheckAward.bind(this));
        this.spinState.SetEnterEventFunction(SPIN_STATE.END, this.onSpinEnd.bind(this));
    }

    //初始化轉輪
    initReel()
    {
        this.symbolData.splice(0, this.symbolData.length);
        for (let i = 0; i < this.reelMask.length + 1; i++)
        {
            this.insertSymbolData();
        }

        this.setSymbolData();
        this.resetSymbolUI();
    }

    //reset symbol UI
    private resetSymbolUI()
    {
        this.symbols.forEach(symbolArray => symbolArray.forEach(symbol => symbol.reset()));
    }

    //塞入轉輪資料
    private insertSymbolData()
    {
        const symbols = [];
        for (let row = 0; row < SYMBOL_ROW; row++)
        {
            let rand = Math.floor(Math.random() * (gameDefine.symbols.length));
            symbols.push(gameDefine.symbols[rand]);
        }
        this.symbolData.unshift(symbols);
    }
    //設定轉輪資料
    setSymbolData()
    {
        for (let row = 0; row < this.reelMask.length; row++)
        {
            for (let col = 0; col < SYMBOL_ROW; col++)
            {
                this.symbols[row][col].SymbolString = this.symbolData[row + 1][col];
                this.symbols[row][col].PreSymbolString = this.symbolData[row][col];
            }
        }
    }
    //開始spin
    startSpin()
    {
        if (this.spinState.CurrentState != SPIN_STATE.IDLE)
            return;
        this.spinState.NextState = SPIN_STATE.SPIN;
        this.spinTime = 0;
        this.spinBeginSpeed = REEL_BEGIN_SPEED;
    }

    //spin process
    private onSpin(dt: number)
    {
        this.spinTime += dt;
        this.spinBeginSpeed = this.spinBeginSpeed > this.spinMaxSpeed ? this.spinMaxSpeed : this.spinBeginSpeed += dt;
        for (let row = 0; row < this.symbols.length; row++)
        {
            for (let col = 0; col < this.symbols[row].length; col++)
            {
                let deltaPosition = cc.v3(0, -(this.spinTime * this.spinBeginSpeed), 0);
                let targetPos = new cc.Vec3();
                cc.Vec3.add(targetPos, this.symbols[row][col].node.position, deltaPosition);

                if (this.symbols[row][col].node.position.y < -this.symbolMoveLength)
                {
                    //表示該symbol已經移動到不可以看到的區域了
                    targetPos.y = this.symbols[row][col].node.position.y % this.symbolMoveLength;
                    this.symbols[row][col].onChangeContent();
                    this.symbolChangeFlag = true;
                }

                this.symbols[row][col].node.setPosition(targetPos);
            }
        }
        this.refreshSymbol();
        if (this.spinTime >= this.spinEndTime)
        {
            //停止轉輪
            this.spinState.NextState = SPIN_STATE.STOP;
        }
    }

    private refreshSymbol()
    {
        if (this.symbolChangeFlag == true)
        {
            this.symbolData.pop();
            this.insertSymbolData();
            this.setSymbolData();
            this.symbolChangeFlag = false;
        }
    }
    //stop spin process
    private onStopSpin(dt: number)
    {
        //stop spin speed
        const STOP_SPIN_SPEED = 1;
        const STOP_SPIN_TIME = 1;
        this.spinTime = this.spinTime <= STOP_SPIN_TIME ? STOP_SPIN_TIME : this.spinTime -= dt;
        this.spinBeginSpeed = this.spinBeginSpeed <= STOP_SPIN_SPEED ?
            STOP_SPIN_SPEED : this.spinBeginSpeed -= (dt * REEL_BEGIN_SPEED);
        if (this.spinTime == STOP_SPIN_TIME && this.spinBeginSpeed == STOP_SPIN_SPEED)
        {
            this.spinState.NextState = SPIN_STATE.CHECK_AWARD;
        }
        for (let x = 0; x < this.symbols.length; x++)
        {
            for (let y = 0; y < this.symbols[x].length; y++)
            {
                let deltaPosition = cc.v3(0, -(this.spinTime * this.spinBeginSpeed), 0);
                let targetPos = new cc.Vec3();
                cc.Vec3.add(targetPos, this.symbols[x][y].node.position, deltaPosition);

                if (this.symbols[x][y].node.position.y < -this.symbolMoveLength)
                {

                    targetPos.y = this.symbols[x][y].node.position.y % this.symbolMoveLength;
                    this.symbols[x][y].onChangeContent();
                    this.symbolChangeFlag = true;

                }

                this.symbols[x][y].node.setPosition(targetPos);
            }
        }
        this.refreshSymbol();
    }

    //spin結束
    private onSpinEnd(dt: number)
    {
        this.spinState.NextState = SPIN_STATE.IDLE;

    }

    //確認獲獎
    private onCheckAward(dt: number)
    {
        let awardSymbol = this.getAwardSymbol();
        const flashTimes = 5;
        const flashDelayTIme = 0.1;
        if (awardSymbol.length > 0)
        {
            cc.tween(this.node)
                .repeat(flashTimes, cc.tween()
                    .call(() =>
                    {
                        awardSymbol.forEach(symbol =>
                        {
                            symbol.onAward();
                        });
                    })
                    .delay(flashDelayTIme)
                    .call(() =>
                    {
                        awardSymbol.forEach(symbol =>
                        {
                            symbol.reset();
                        })
                    })
                    .delay(flashDelayTIme))
                .call(() =>
                {
                    this.spinState.NextState = SPIN_STATE.END;
                })
                .start();
        }
        else
        {
            this.spinState.NextState = SPIN_STATE.END;
        }
    }

    onUpdate(dt: number)
    {
        this.spinState.OnTransit(dt);
    }

    //檢查是否有獎勵
    private getAwardSymbol(): symbolComp[]
    {
        let awardSymbol: symbolComp[] = [];
        for (let row = 0; row < SYMBOL_COLUMN; row++)
        {
            let combo: Set<string> = new Set<string>();
            for (let col = 0; col < SYMBOL_ROW; col++)
            {
                combo.add(this.symbolData[row][col]);
            }
            if (combo.size == 1)
            {
                this.symbols[row].forEach(symbol => awardSymbol.push(symbol));
            }
        }
        return awardSymbol;
    }

}
