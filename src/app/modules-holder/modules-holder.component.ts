import { Component, createComponent, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {PenComponent} from '../modules/modules/pen/pen.component';
import { ModuleHolderComponent } from './module-holder/module-holder.component';
import { EngineService } from '../engine/engine.service';
import { ICanvasModuleClass } from '../modules/module.interface';

@Component({
  selector: 'app-modules-holder',
  standalone: true,
  imports: [ModuleHolderComponent],
  templateUrl: './modules-holder.component.html',
  styleUrl: './modules-holder.component.scss'
})
export class ModulesHolderComponent implements OnInit {

  @ViewChild('moduleHolder', { read: ViewContainerRef, static: true }) moduleHolder!: ViewContainerRef;

  public modules: ICanvasModuleClass[] = [];

  constructor(private engine: EngineService) { }

  ngOnInit(): void {
      this.modules = this.engine.getModules();
      /**
       * This is a workaround to start default module after all modules are loaded
       */
      setTimeout(() => {
          this.engine.startDefaultModule();
      },50);
  }
     
}
