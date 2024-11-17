import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EngineService } from '../../../engine/engine.service';
import { ICanvasModule } from '../../module.interface';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit, ICanvasModule {

  public static id="download";

  public id = DownloadComponent.id;

  private _start = false;

  constructor(private engine: EngineService) { }

  ngOnInit(): void {
  }

  public start(){
    this._start = true;
    this.downloadCanvasAsImage();
  }

  public stop(){
    this._start = false;
  }

  public onClick(event: MouseEvent){
    this.engine.notifyStart(this.id);
  }

  private downloadCanvasAsImage(){
    if(this._start){
      const context = this.engine.getCanvasContext() as CanvasRenderingContext2D;
      context.canvas.toBlob((blob)=>{
        const url = URL.createObjectURL(blob as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.png';
        a.click();
        URL.revokeObjectURL(url);
        this.engine.notifyStop(this.id); 
      }, 'image/png', 1);
     
    }
   
  }
 
}
