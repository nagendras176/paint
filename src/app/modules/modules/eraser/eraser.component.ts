import { Component , OnInit} from '@angular/core';
import { ICanvasModule } from '../../module.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EngineService } from '../../../engine/engine.service';

@Component({
  selector: 'app-eraser',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './eraser.component.html',
  styleUrl: './eraser.component.scss'
})
export class EraserComponent implements OnInit, ICanvasModule{

   public static id = 'eraser-module';

   public id: string = EraserComponent.id;

   private _stop: boolean = true;
   
   constructor(private engine: EngineService){}

    private _size: number = 15;

    ngOnInit(): void {
        
    }


    start(): void {
      this._stop = false;
      const events = this.engine.getEventHandler();
      const canvasContext = this.engine.getCanvasContext();
      this.setCursor();
      this.preErase(events, canvasContext);
    }

    private currentX: number = 0;
    private currentY: number = 0;
    private isErasing: boolean = false;

    preErase(events: any, canvasContext: any): void {
      const mouseDownSubscription = events.onMouseDown.subscribe((event: MouseEvent) => {
        if(this._stop){
           mouseDownSubscription.unsubscribe();
            return;
        }
        this.isErasing = true;
        mouseDownSubscription.unsubscribe();
        this.startErasing(events, canvasContext);
   });
    }

    startErasing(events: any, canvasContext: any): void {
      const mouseMoveSubscription = events.onMouseMove.subscribe((event: MouseEvent) => {
        if(this._stop){
            mouseMoveSubscription.unsubscribe();
            return;
        }
        if(this.isErasing){
            this.erase(canvasContext);
            this.currentX = event.clientX;
            this.currentY = event.clientY;
        }

    });
    this.postErase(events);
    }

    postErase(events: any): void {
      const mouseUpSubscription = events.onMouseUp.subscribe((event: MouseEvent) => {
        if(this._stop){
            mouseUpSubscription.unsubscribe();
            return;
        }
        this.isErasing = false;
        mouseUpSubscription.unsubscribe();
        this.preErase(events, this.engine.getCanvasContext());
    });
    }

    erase(context: CanvasRenderingContext2D): void {
        context.clearRect(this.currentX, this.currentY, this._size, this._size);
    }


    stop(): void {
        this._stop = true;
    }

    public onClick(event: MouseEvent){
        this.engine.notifyStart(this.id);
    }

    public setCursor(): void {
       const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this._size}" height="${this._size}" stroke="black" stroke-width="2"><rect x="0" y="0" width="${this._size}" height="${this._size}" fill="yellow"></rect></svg>`;
       const cursorUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
       const cursor = `url(${cursorUrl}) ${this._size/2} ${this._size/2}, auto`;
        this.engine.setCanvasWindowCursor(cursor)
    }
}
