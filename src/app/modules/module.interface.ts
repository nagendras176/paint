import { Directive } from "@angular/core";

;

export interface ICanvasModule extends Directive{
    id: string;
    init(canvasContext: CanvasRenderingContext2D, events: any): void;
    giveUpControl(): void;
}


export interface ICanvasModuleRegistry {
     modules: ICanvasModule[];
}