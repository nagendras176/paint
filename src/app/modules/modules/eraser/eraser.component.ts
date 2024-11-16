import { Component , OnInit} from '@angular/core';
import { ICanvasModule } from '../../module.interface';

@Component({
  selector: 'app-eraser',
  standalone: true,
  imports: [],
  templateUrl: './eraser.component.html',
  styleUrl: './eraser.component.scss'
})
export class EraserComponent implements OnInit, ICanvasModule{

   public static id = 'eraser-module';

   public id: string = EraserComponent.id;

   private _stop: boolean = true;
   
   constructor(){}

    ngOnInit(): void {
        
    }


    start(): void {
        
    }


    stop(): void {
        this._stop = true;
    }
}
