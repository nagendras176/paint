import { Observable, Subscribable } from "rxjs";


export interface ICanvasEngineEventHandler {
       
        
        onMouseDown: Observable<MouseEvent>
        
        
        onMouseMove: Observable<MouseEvent>
        
        
        onMouseUp: Observable<MouseEvent>
    }
