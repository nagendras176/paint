import { ICanvasModule } from "../../modules/module.interface";
import { ICanvasEngineEventHandler } from "../event-handler.interface";
import { ICanvasEngineModulesHandler } from "../modules-handler.interface";

export class CanvasEngineModuleManager implements ICanvasEngineModulesHandler{
       private modules: ICanvasModule[] = [];
       private canvasElement: HTMLCanvasElement;
       private eventHandler: ICanvasEngineEventHandler;
       constructor(canvasElement: HTMLCanvasElement, eventHandler: ICanvasEngineEventHandler){
            this.canvasElement = canvasElement;
            this.eventHandler = eventHandler;
       }

       public getModules = () => this.modules;
}