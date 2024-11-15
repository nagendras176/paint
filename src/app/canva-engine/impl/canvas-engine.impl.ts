import { ICanvasEngine } from "../canvas-engine.interface";
import { ICanvasEngineEventHandler } from "../event-handler.interface";
import { ICanvasEngineModulesHandler } from "../modules-handler.interface";
import { CanvasEngineModuleManager } from "./module-manager.impl";
import {CanvasEventHandler} from './event-handler.impl';

export class CanvasEngine implements ICanvasEngine{

    private canvasElement: HTMLCanvasElement;
    private modulesHandler: ICanvasEngineModulesHandler;
    private eventHandler: ICanvasEngineEventHandler;

    constructor(canvasElement: HTMLCanvasElement){
        this.canvasElement = canvasElement;
        this.eventHandler = new CanvasEventHandler(this.canvasElement);
        this.modulesHandler = new CanvasEngineModuleManager(this.canvasElement, this.eventHandler);
    }

    public getModuleManager = () => this.modulesHandler;
}