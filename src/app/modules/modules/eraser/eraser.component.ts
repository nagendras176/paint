import { ChangeDetectionStrategy, Component , Inject, inject, OnInit} from '@angular/core';
import { ICanvasModule } from '../../module.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EngineService } from '../../../engine/engine.service';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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

   private dialog = inject(MatDialog);
   
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
        context.clearRect(this.currentX - Number(this._size/2), this.currentY- Number(this._size/2), this._size, this._size);
    }


    stop(): void {
        this._stop = true;
    }

    public onClick(event: MouseEvent){
        this.engine.notifyStart(this.id);

        const dialogRef: MatDialogRef<EraserConfigDialog>=this.dialog.open(EraserConfigDialog, {
            data: {size: this._size}
        });
        dialogRef.afterClosed().subscribe((result) => {
            if(result){
                this._size = result.size;
                this.setCursor();
            }
        });
    }

    public setCursor(): void {
       const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this._size}" height="${this._size}" stroke="black" stroke-width="2"><rect x="0" y="0" width="${this._size}" height="${this._size}" fill="yellow"></rect></svg>`;
       const cursorUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
       const cursor = `url(${cursorUrl}) ${this._size/2} ${this._size/2}, auto`;
        this.engine.setCanvasWindowCursor(cursor)
    }
}



@Component({
  selector: 'pen-config-dialog',
  templateUrl: './eraser.config.dialog.html',
  styleUrl: './eraser.config.dialog.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, 
     MatIconModule, MatSliderModule,FormsModule, MatInputModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EraserConfigDialog implements OnInit{
  readonly dialogRef = inject(MatDialogRef<EraserConfigDialog>);

  constructor(@Inject(MAT_DIALOG_DATA) private  data: {size: number}){}

  ngOnInit(): void {
     this.value = (this.data?.size && this.data.size >= 15) ? this.data.size - 15 : 0;
  }

  public value: number = 0;
  public get size(): number{
      return 15 + this.value;
  }

  public onPick(){
      this.dialogRef.close({size: this.size});
  }

  public onCancel(){
      this.dialogRef.close();
  }

  public eraserSizeInPercentage(size: number): string {
      return `${(Number(size/65)*100).toFixed(1)} %`;
  }


}

