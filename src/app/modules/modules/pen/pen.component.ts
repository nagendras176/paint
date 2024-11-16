import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICanvasModule } from '../../module.interface';
import { EngineService } from '../../../engine/engine.service';
import { ModuleRegistry } from '../../module-registry';


@Component({
  selector: 'app-pen',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pen.component.html',
  styleUrl: './pen.component.scss',
})
export class PenComponent implements ICanvasModule{

    public static id = 'pen-module';

    private _stop: boolean = true;

     constructor(private engine: EngineService){}

     public id: string = PenComponent.id;

     


      public giveUpControl(){
          console.log('Pen module give up control');
      }

      public start(){ 

        this._stop = false;


        
        const events = this.engine.getEventHandler();
        const canvasContext = this.engine.getCanvasContext();


        this.preStartDrawing(events, canvasContext);

      }

      public stop(){
            
      }

      private weight: number = 4;


      private drawLine(startX: number, startY: number, endX: number, endY: number, context: CanvasRenderingContext2D){
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.strokeStyle = 'black';
          context.lineWidth = this.weight;
          context.stroke();
          context.closePath();
      }

      private currentX: number = 0;
      private currentY: number = 0;
      private isDrawing: boolean = false;

      private preStartDrawing(events: any, context: CanvasRenderingContext2D){
            const mouseDownSubscription = events.onMouseDown.subscribe((event: MouseEvent) => {
                if(this._stop){
                   mouseDownSubscription.unsubscribe();
                    return;
                }
                this.currentX = event.clientX;
                this.currentY = event.clientY;
                this.isDrawing = true;
                mouseDownSubscription.unsubscribe();
                this.startDrawing(events, context);
           });
      }

      private startDrawing(events: any, context: CanvasRenderingContext2D){
        const mouseMoveSubscription = events.onMouseMove.subscribe((event: MouseEvent) => {
            if(this._stop){
                mouseMoveSubscription.unsubscribe();
                return;
            }
            if(this.isDrawing){
                this.drawLine(this.currentX, this.currentY, event.clientX, event.clientY, context);
                this.currentX = event.clientX;
                this.currentY = event.clientY;
            }

        });
        this.stopDrawing(events);
      }

      private stopDrawing(events: any){
        const mouseUpSubscription = events.onMouseUp.subscribe((event: MouseEvent) => {
            if(this._stop){
                mouseUpSubscription.unsubscribe();
                return;
            }
            this.isDrawing = false;
            mouseUpSubscription.unsubscribe();
            this.preStartDrawing(events, this.engine.getCanvasContext());
        });
      }


}

