import { ICanvasModule, ICanvasModuleRegistry } from "../modules/module.interface";
import { ICanvasEngineEventHandler } from "./event-handler.interface";


export interface ICanvasEngineModulesHandler {
        
    getModules: () => ICanvasModule[];

}
