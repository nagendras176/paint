import { signal, Signal, WritableSignal } from "@angular/core";
import { ICanvasEngineEventHandler } from "./event-handler.interface";
import { Observable, Subject, Subscribable, Subscriber } from "rxjs";

export class CanvasEventHandler implements ICanvasEngineEventHandler{

    private mouseDownEvent: Subject<MouseEvent> = new Subject<MouseEvent>()
    private mouseMoveEvent: Subject<MouseEvent> = new Subject<MouseEvent>()
    private mouseUpEvent: Subject<MouseEvent> = new Subject<MouseEvent>()

    public onMouseDown: Observable <MouseEvent> = this.mouseDownEvent.asObservable()
    public onMouseMove: Observable<MouseEvent> = this.mouseMoveEvent.asObservable()
    public onMouseUp: Observable<MouseEvent> = this.mouseUpEvent.asObservable()
    
    
    constructor(canvasElement: HTMLCanvasElement){
        canvasElement.addEventListener('mousedown', (event: MouseEvent) => this.mouseDownEvent.next(event))
        canvasElement.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveEvent.next(event))
        canvasElement.addEventListener('mouseup', (event: MouseEvent) => this.mouseUpEvent.next(event))
    }

    

}