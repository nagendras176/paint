import { Subscribable } from "rxjs";


export interface ICanvasEngineEventHandler {
       
        
        onMouseDown: Subscribable<MouseEvent>
        
        
        onMouseMove: Subscribable<MouseEvent>
        
        
        onMouseUp: Subscribable<MouseEvent>
    }
