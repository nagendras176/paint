import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICanvasModule } from '../module.interface';

@Component({
  selector: 'app-pen',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pen.component.html',
  styleUrl: './pen.component.scss',
})
export class PenComponent implements ICanvasModule{

     constructor(){}

     public id: string = 'pen-module';

      public init(canvasContext: CanvasRenderingContext2D, events: any){
          events.onMouseDown.subscribe((event: MouseEvent) => {
              console.log('Pen module mouse down event');
              canvasContext.beginPath();
              canvasContext.arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI);
          });
      }


      public giveUpControl(){
          console.log('Pen module give up control');
      }

}
