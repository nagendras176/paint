import { Directive } from "@angular/core";
import { EngineService } from "../engine/engine.service";

export interface ICanvasModule extends Directive{
    id: string;
    start(): void;
    stop(): void;
}



export interface ICanvasModuleClass {
    readonly id: string; 
    new (engine: EngineService): ICanvasModule; 
  }