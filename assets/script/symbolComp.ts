import * as cc from "cc"
const { ccclass, property } = cc._decorator

@ccclass("symbolComp")
export class symbolComp extends cc.Component
{
    @property(cc.Node) preNode: cc.Node;
    @property(cc.Label) preLabel: cc.Label;
    @property(cc.Node) nowNode: cc.Node;
    @property(cc.Label) nowLabel: cc.Label;
    @property(cc.Color) awardColor: cc.Color = new cc.Color();
    @property(cc.Color) normalColor: cc.Color = new cc.Color();
    @property([cc.Sprite]) sprites: cc.Sprite[] = new Array<cc.Sprite>();
    private color: cc.Color = new cc.Color();
    private nowSymbolString: string = "";

    start()
    {

    }

    reset()
    {
        this.sprites.forEach(sprite =>
        {
            sprite.color = this.normalColor.clone();
        });
    }

    onAward()
    {
        this.sprites.forEach(sprite =>
        {
            sprite.color = this.awardColor.clone();
        });
    }

    set PreSymbolString(symbolString: string)
    {
        this.preLabel.string = symbolString;
    }

    get PreSymbolString(): string
    {
        return this.preLabel.string;
    }

    set SymbolString(symbolString: string)
    {
        this.nowSymbolString = symbolString;
        this.nowLabel.string = symbolString;
    }

    get SymbolString(): string
    {
        return this.nowSymbolString;
    }

    onNext()
    {
        const preNodePosition = this.preNode.position;
        this.nowNode.position = preNodePosition;
    }
    onChangeContent()
    {
        const tempLabelContent = this.nowLabel.string;
        this.nowLabel.string = this.preLabel.string;
        this.preLabel.string = tempLabelContent;
    }

    getMoveLength(): number
    {
        return Math.abs(this.node.position.y);
    }

}