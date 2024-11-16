import { ICanvasModule } from "./module.interface";
import { EngineService } from "../engine/engine.service";


export interface ICanvasModuleClass {
    readonly id: string; 
    new (engine: EngineService): ICanvasModule; 
  }
  


export class ModuleRegistry {
    
    private static _modules: ICanvasModuleClass[] = [];

    public static registerModule(module: ICanvasModuleClass): void {
        ModuleRegistry._modules.push(module);
    }

    public static getModules(): ICanvasModuleClass[] {
        return ModuleRegistry._modules;
    }

    public static getModuleById(id: string): ICanvasModuleClass | undefined {
        return ModuleRegistry._modules.find(module => module.id === id);
    }

}