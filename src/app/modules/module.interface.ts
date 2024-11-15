import { Directive } from "@angular/core";

export interface ICanvasModule extends Directive{
    id: string;
    init(): void;
    giveUpControl(): void;
}


export interface ICanvasModuleRegistry {
     modules: ICanvasModule[];
}