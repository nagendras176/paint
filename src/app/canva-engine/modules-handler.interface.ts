import { ICanvasModule, ICanvasModuleRegistry } from "../modules/module.interface";
import { ICanvasEngineEventHandler } from "./event-handler.interface";


export interface ICanvasEngineModulesHandler {
        
    new (eventHandler: ICanvasEngineEventHandler, moduleRegistry: ICanvasModuleRegistry): void;
    
    getModules: () => ICanvasModule[]

    getModuleByName: (name: string) => ICanvasModule;


}