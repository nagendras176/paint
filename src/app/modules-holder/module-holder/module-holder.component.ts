import { Component, input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { ICanvasModule } from '../../modules/module.interface';
import { EngineService } from '../../engine/engine.service';

@Component({
  selector: 'app-module-holder',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './module-holder.component.html',
  styleUrl: './module-holder.component.scss'
})
export class ModuleHolderComponent  implements OnInit {

  @ViewChild('m', {
    read: ViewContainerRef,
    static: true
  }) public moduleHolderDiv: any;

  public module = input.required()

  private moduleComponentRef: any;

  constructor(private engine: EngineService) { }

  ngOnInit(): void {
    
    const moduleComponent = this.module();
    this.moduleHolderDiv.clear();
    this.moduleComponentRef =  this.moduleHolderDiv.createComponent(moduleComponent);
    const instance = this.moduleComponentRef.instance as ICanvasModule;
    this.engine.registerActiveModule(instance);

  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
  
  }
   
}
