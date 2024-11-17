import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICanvasModule } from '../../module.interface';
import { EngineService } from '../../../engine/engine.service';
import {MatSliderModule} from '@angular/material/slider';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



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

     private _penColor: string = `rgb(0,0,0)`;
     private _penSize: number = 2;

     readonly dialog = inject(MatDialog);

     


      public giveUpControl(){
          console.log('Pen module give up control');
      }

      public start(){ 
        this._stop = false;
        const events = this.engine.getEventHandler();
        const canvasContext = this.engine.getCanvasContext();
        this.setCursor();
        this.preStartDrawing(events, canvasContext);

      }

      public stop(){
            this._stop = true;
      }



      private drawLine(startX: number, startY: number, endX: number, endY: number, context: CanvasRenderingContext2D){
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.strokeStyle = this._penColor;
          context.lineWidth = this._penSize;
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

      public onClick(event: MouseEvent){
        this.engine.notifyStart(this.id);
        const dialogRef: MatDialogRef<PenConfigDialog>=this.dialog.open(PenConfigDialog, {
            data: {
                color: this._penColor,
                size: this._penSize
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if(result){
                this._penColor = result.color;
                this._penSize = result.size;
                this.setCursor();
            }
        });
    
  }

     private setCursor(){
        const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="${this._penSize}" fill="${this._penColor}" />
</svg>`;
const encodedSVG = `data:image/svg+xml;base64,${btoa(svg)}`;
const cursor = `url(${encodedSVG}) 16 16, auto`;
  this.engine.setCanvasWindowCursor(cursor)
    }


}



@Component({
    selector: 'pen-config-dialog',
    templateUrl: './pen.config.dialog.html',
    styleUrl: './pen.config.dialog.scss',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, 
       MatIconModule, MatSliderModule,FormsModule, MatInputModule, MatFormFieldModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class PenConfigDialog implements OnInit{
    readonly dialogRef = inject(MatDialogRef<PenConfigDialog>);

    constructor(@Inject(MAT_DIALOG_DATA) private data : {
        color: string,
        size: number
    }){}

    ngOnInit(): void {
        if(this.data?.color){
            const rgb = this.rgbStringToNumber(this.data.color);
            this.setColor(rgb);
        }
        if(this.data?.size){
            this.value = (this.data.size - 1)/25*100;
        }
    }

    public value: number = 1;
    public get size(){
        return (Number(this.value)/100)*25+1;
    }

    public get colorSet(): number[][]{
        return [
            [0, 0, 0],
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [255, 255, 0],
            [255, 0, 255],
            [0, 255, 255],
            [255, 255, 255]
        ]
    }

    public getColor(rgb: number[]){
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    private rgbStringToNumber(rgb: string){
        const values = rgb.match(/\d+/g);
        if(!values){
            return [0,0,0];
        }
        return values.map((value) => Number(value));
    }



    public r=0
    public g=0
    public b=0;

    public setColor(rgb: number[]){
        this.r = rgb[0];
        this.g = rgb[1];
        this.b = rgb[2];
    }

    public onCancel(){
        this.dialogRef.close();
    }

    public onPick(){
        this.dialogRef.close({color: this.getColor([this.r,this.g,this.b]), size: this.size});
    }


  }
  

