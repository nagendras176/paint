import { ICanvasModule } from "../../modules/module.interface";
import { ICanvasEngineEventHandler } from "../event-handler.interface";
import { ICanvasEngineModulesHandler } from "../modules-handler.interface";
import {PenComponent} from '../../modules/pen/pen.component';
import { createComponent } from "@angular/core";

export class CanvasEngineModuleManager implements ICanvasEngineModulesHandler{
       private modules: any[] = [PenComponent];
       private canvasElement: HTMLCanvasElement;
       private eventHandler: ICanvasEngineEventHandler;
       constructor(canvasElement: HTMLCanvasElement, eventHandler: ICanvasEngineEventHandler){
            this.canvasElement = canvasElement;
            this.eventHandler = eventHandler;
       }

       public getModules = () => this.modules;
}