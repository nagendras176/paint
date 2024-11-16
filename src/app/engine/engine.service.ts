import { Injectable } from '@angular/core';
import { ICanvasEngineEventHandler } from './event-handler/event-handler.interface';
import {CanvasEventHandler} from './event-handler/event-handler.impl';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  private _eventHandler?: ICanvasEngineEventHandler;
  private _canvasElement?: HTMLCanvasElement;
  private _context?: CanvasRenderingContext2D;


  constructor() { }

  public startEngine(canvasElement: HTMLCanvasElement){ 
    this._canvasElement = canvasElement;
    this._eventHandler = new CanvasEventHandler(canvasElement);
    this._context = this._canvasElement.getContext('2d') as CanvasRenderingContext2D;
  }

  public getCanvasContext(): CanvasRenderingContext2D {
    return this._context as CanvasRenderingContext2D;
  }

  public getEventHandler(): ICanvasEngineEventHandler {
    return this._eventHandler as ICanvasEngineEventHandler;
  }


}
