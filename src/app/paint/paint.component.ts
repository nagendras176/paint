import { Component, ElementRef, OnInit, Signal, viewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ICanvasModule, ICanvasModuleClass } from '../modules/module.interface';
import { ModulesHolderComponent } from '../modules-holder/modules-holder.component';
import { EngineService } from '../engine/engine.service';
import { ModuleHolderComponent } from '../modules-holder/module-holder/module-holder.component';
@Component({
  selector: 'app-paint',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,ModulesHolderComponent, ModuleHolderComponent],
  templateUrl: './paint.component.html',
  styleUrl: './paint.component.scss',
  providers: [EngineService]
})
export class PaintComponent implements OnInit {

  private canvasSignalElement: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasBoard');
  public modules: ICanvasModuleClass[] = [];


  constructor(private engine: EngineService) { }

  ngOnInit(): void {
    const canvasElementRef = this.getCanvasElementRef();
    this.setUpCanvasWindow(canvasElementRef);
    const canvasElement: HTMLCanvasElement = this.getCanvasElement(canvasElementRef);
    this.engine.startEngine(canvasElement);
    this.modules = this.engine.getModules();
    this.startModules();
  }


  private getCanvasElementRef(): ElementRef<HTMLCanvasElement> {
       const canvasElementRef: ElementRef<HTMLCanvasElement> = this.canvasSignalElement();
       return canvasElementRef;
  }

  private setUpCanvasWindow(canvasElement: ElementRef<HTMLCanvasElement>): void {
    const resizeCanvas = () => {
      const parentElement: HTMLElement = canvasElement.nativeElement.parentElement as HTMLElement;
  
      if (!parentElement) {
        console.error("Parent element not found for canvas.");
        return;
      }
  
     
      const parentElementWidth: number = parentElement.clientWidth;
      const parentElementHeight: number = parentElement.clientHeight;
  

      const pixelRatio: number = 1;
  
    
      canvasElement.nativeElement.width = parentElementWidth * pixelRatio;
      canvasElement.nativeElement.height = parentElementHeight * pixelRatio;
  
     
      const context = canvasElement.nativeElement.getContext('2d');
      if (context) {
        context.scale(pixelRatio, pixelRatio);
      }
    };
  
    resizeCanvas();
  
    window.addEventListener('resize', resizeCanvas);
  
   
  }

  private getCanvasElement(elemRef: ElementRef<HTMLCanvasElement>): HTMLCanvasElement {
        const canvasElement: HTMLCanvasElement = this.getCanvasElementRef().nativeElement as HTMLCanvasElement;
        return canvasElement;
  }

  private startModules(): void {
      setTimeout(() => {
          this.engine.startDefaultModule();
      },100);
  }

  public openGithub(): void {
    const url = 'https://github.com/nagendras176/paint';
    window.open(url, '_blank');
  }



}
