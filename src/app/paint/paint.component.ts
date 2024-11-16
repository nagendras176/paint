import { Component, ElementRef, OnInit, Signal, viewChild, Renderer2, createComponent } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ICanvasEngine } from '../canvas-engine/canvas-engine.interface';
import {CanvasEngine} from '../canvas-engine/impl/canvas-engine.impl';
import { ICanvasEngineModulesHandler } from '../canvas-engine/modules-handler.interface';
import { ICanvasModule } from '../modules/module.interface';
import { ModulesHolderComponent } from '../modules-holder/modules-holder.component';
@Component({
  selector: 'app-paint',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,ModulesHolderComponent],
  templateUrl: './paint.component.html',
  styleUrl: './paint.component.scss',
})
export class PaintComponent implements OnInit {

  private canvasSignalElement: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasBoard');
  private  moduleHolderSignal: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('modulesHolder');

  private canvasEngine?: ICanvasEngine;

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
    const canvasElementRef = this.getCanvasElementRef();
    this.setUpCanvasWindow(canvasElementRef);
    const canvasElement: HTMLCanvasElement = this.getCanvasElement(canvasElementRef);
    this.canvasEngine = new CanvasEngine(canvasElement);
    this.setModulesUI();
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
      canvasElement.nativeElement.style.width = `${parentElementWidth}px`;
      canvasElement.nativeElement.style.height = `${parentElementHeight}px`;
  }

  private setModulesUI(): void {

    try{
      const moduleManger: ICanvasEngineModulesHandler = (this.canvasEngine as ICanvasEngine).getModuleManager();
      const modules: ICanvasModule[] = moduleManger.getModules();
      //each modules are components I need to render them in the UI in runtime 
      //I need to render them in the UI in runtime
      const modulesHolder: ElementRef<HTMLDivElement> = this.moduleHolderSignal();
      
      createComponent(modules[0] as any,{
        hostElement: modulesHolder.nativeElement as Element
      } as any);

    } catch (error) {
      console.error('Error while setting up modules UI', error);
    }
      
      
  }

  private getCanvasElement(elemRef: ElementRef<HTMLCanvasElement>): HTMLCanvasElement {
        const canvasElement: HTMLCanvasElement = this.getCanvasElementRef().nativeElement as HTMLCanvasElement;
        return canvasElement;
  }


}
