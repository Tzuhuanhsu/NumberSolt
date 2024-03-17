//有限狀態機事件
type stateEventFunction = (delta: number) => void;
//有限狀態機
export default class StateMachine<T>
{
    //狀態轉換只執行一次的事件
    private onEnterEvent: Map<T, stateEventFunction> = new Map<T, stateEventFunction>();
    //狀態轉換後會不斷執行的事件
    private onEvent: Map<T, stateEventFunction> = new Map<T, stateEventFunction>();
    //目前狀態
    private currentState: T;
    //下個狀態
    private nextState: T;
    //轉換旗標
    private transit: boolean = false;
    constructor (initState: T)
    {
        this.currentState = initState;
        this.nextState = initState;
    }
    //新增狀態對應只執行一次的事件
    SetEnterEventFunction(event: T, fun: stateEventFunction)
    {
        this.onEnterEvent.set(event, fun);
    }
    //新增狀態對應會不斷執行的事件
    SetEventFunction(event: T, fun: stateEventFunction)
    {
        this.onEvent.set(event, fun);
    }
    //狀態轉換
    OnTransit(dt?: number): T
    {
        if (this.transit)
        {
            this.CurrentState = this.NextState;
            this.transit = false;
            this.onEnterEvent.has(this.CurrentState) && this.onEnterEvent.get(this.CurrentState)(dt);
        }
        else
        {
            this.onEvent.has(this.CurrentState) && this.onEvent.get(this.CurrentState)(dt);
        }

        return this.CurrentState;
    }
    //設定下一個狀態
    set NextState(State: T)
    {
        this.nextState = State;
        this.transit = true;
    }
    //取得下一個狀態
    get NextState(): T
    {
        return this.nextState;
    }
    //取得目前狀態
    set CurrentState(State: T)
    {
        this.currentState = State;
    }

    //取得目前的狀態
    get CurrentState(): T
    {
        return this.currentState;
    }

}