import { Component , OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICanvasModule } from '../../module.interface';
import { EngineService } from '../../../engine/engine.service';


@Component({
  selector: 'app-clear-board',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './clear-board.component.html',
  styleUrl: './clear-board.component.scss'
})
export class ClearBoardComponent implements OnInit, ICanvasModule{

  public static id= 'clear-board';

  public id = ClearBoardComponent.id;

  constructor(private engine: EngineService) { }

  private _stop: boolean = true;

  ngOnInit(): void {
  }


  public start(): void {
      this._stop = false;
      this.clearBoard();  
  }


  public stop(): void {
      this._stop = true;
  }

  private clearBoard(): void {
     if(!this._stop) {
        const canvasContext = this.engine.getCanvasContext();
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        this.engine.notifyStop(this.id);
     }
  }


  public onClick(): void {
      this.engine.notifyStart(this.id);
  }

}
