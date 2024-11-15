import { Signal } from "@angular/core";


export interface ICanvasEngineEventHandler {
        new (canvasElement: HTMLCanvasElement): void;
        
        onMouseDown: Signal<MouseEvent>;
        
        
        onMouseMove: Signal<MouseEvent>;
        
        
        onMouseUp: Signal<MouseEvent>;
    }
