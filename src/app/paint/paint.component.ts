import { Component, ElementRef, OnInit, Signal, viewChild, Renderer2, createComponent } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ICanvasModule } from '../modules/module.interface';
import { ModulesHolderComponent } from '../modules-holder/modules-holder.component';
import { EngineService } from '../engine/engine.service';
@Component({
  selector: 'app-paint',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,ModulesHolderComponent],
  templateUrl: './paint.component.html',
  styleUrl: './paint.component.scss',
  providers: [EngineService]
})
export class PaintComponent implements OnInit {

  private canvasSignalElement: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasBoard');


  constructor(private engine: EngineService) { }

  ngOnInit(): void {
    const canvasElementRef = this.getCanvasElementRef();
    this.setUpCanvasWindow(canvasElementRef);
    const canvasElement: HTMLCanvasElement = this.getCanvasElement(canvasElementRef);
    this.engine.startEngine(canvasElement);
  }

  private getCanvasElementRef(): ElementRef<HTMLCanvasElement> {
       const canvasElementRef: ElementRef<HTMLCanvasElement> = this.canvasSignalElement();
       return canvasElementRef;
  }

  private setUpCanvasWindow(canvasElement: ElementRef<HTMLCanvasElement>): void {
      const parentElement: HTMLElement = canvasElement.nativeElement.parentElement as HTMLElement;
      const parentElementWidth: number = parentElement.clientWidth as number;
      const parentElementHeight: number = parentElement.clientHeight as number;

      const pixelRatio: number = window.devicePixelRatio as number;

      canvasElement.nativeElement.width = parentElementWidth * pixelRatio;
      canvasElement.nativeElement.height = parentElementHeight * pixelRatio;
      
  }

  private getCanvasElement(elemRef: ElementRef<HTMLCanvasElement>): HTMLCanvasElement {
        const canvasElement: HTMLCanvasElement = this.getCanvasElementRef().nativeElement as HTMLCanvasElement;
        return canvasElement;
  }



}
