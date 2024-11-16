import { ICanvasModule, ICanvasModuleClass } from "./module.interface";



export class ModuleRegistry {
    
    private static _modules: ICanvasModuleClass[] = [];
    private static _defaultModuleId?: string;

    public static registerModule(module: ICanvasModuleClass, options?: {default: boolean}): void {
        ModuleRegistry._modules.push(module);
        if(options && options.default) {
            if(this._defaultModuleId) {
                throw new Error('Default module already set');
            }
            this._defaultModuleId = module.id;
        }
    }

    public static getModules(): ICanvasModuleClass[] {
        return ModuleRegistry._modules;
    }

    public static getModuleById(id: string): ICanvasModuleClass | undefined {
        return ModuleRegistry._modules.find(module => module.id === id);
    }

    public static getDefaultModuleId(): string {
        return ModuleRegistry._defaultModuleId as string;
    }

}