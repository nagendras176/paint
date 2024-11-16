import { Component, input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { ICanvasModule } from '../../modules/module.interface';

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

  constructor() { }

  ngOnInit(): void {
    
    const moduleComponent = this.module();
    this.moduleHolderDiv.clear();
    this.moduleComponentRef =  this.moduleHolderDiv.createComponent(moduleComponent);

  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
  
  }
   
}
