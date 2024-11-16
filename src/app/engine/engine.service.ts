import { Injectable } from '@angular/core';
import { ICanvasEngineEventHandler } from './event-handler/event-handler.interface';
import {CanvasEventHandler} from './event-handler/event-handler.impl';
import {ModuleRegistry} from '../modules/module-registry';
import { ICanvasModule, ICanvasModuleClass } from '../modules/module.interface';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  private _eventHandler?: ICanvasEngineEventHandler;
  private _canvasElement?: HTMLCanvasElement;
  private _context?: CanvasRenderingContext2D;


  private _modules: ICanvasModuleClass[] = [];


  constructor() { }

  public startEngine(canvasElement: HTMLCanvasElement){ 
    this._canvasElement = canvasElement;
    this._eventHandler = new CanvasEventHandler(canvasElement);
    this._context = this._canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.setModules();
  }


  private setModules(): void {
    this._modules = ModuleRegistry.getModules();
  }

  public getModules(): ICanvasModuleClass[] {
    return this._modules;
  }

  public getCanvasContext(): CanvasRenderingContext2D {
    return this._context as CanvasRenderingContext2D;
  }

  public getEventHandler(): ICanvasEngineEventHandler {
    return this._eventHandler as ICanvasEngineEventHandler;
  }

  
 
private _activeModuleId?: string;

private _activeModules: Map<string, ICanvasModule> = new Map();



/**
 *  This method is used by modules handler to register actual instance of module
 * @param id 
 */
public registerActiveModule(module: ICanvasModule): void {
    const id = module.id;
    this._activeModules.set(id, module);
}


public notifyStart(id: string): void {
   if(id == this._activeModuleId){
       return;
   } 
   this.stopModule(this._activeModuleId as string);
   this.startModule(id);
   this._activeModuleId = id;
}


public notifyStop(id: string): void {
    if(id == this._activeModuleId){
        this.stopModule(id);
        this._activeModuleId = ModuleRegistry.getDefaultModuleId();
        this.startModule(this._activeModuleId);
    }
}

private stopModule(id: string): void {
    const module = this._activeModules.get(id);
    if(module){
        module.stop();
    }
}

private startModule(id: string): void {
    const module = this._activeModules.get(id);
    if(module){
        module.start();
    }
}


}
