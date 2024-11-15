import { ICanvasEngineModulesHandler } from "./modules-handler.interface";

 
   export interface ICanvasEngine {
       getModuleManager: () => ICanvasEngineModulesHandler;
   }
