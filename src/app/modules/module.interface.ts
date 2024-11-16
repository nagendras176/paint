import { Directive } from "@angular/core";

export interface ICanvasModule extends Directive{
    id: string;
    start(): void;
    stop(): void;
}
