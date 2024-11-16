import { Component, createComponent, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {PenComponent} from '../modules/pen/pen.component';
import { ModuleHolderComponent } from './module-holder/module-holder.component';

@Component({
  selector: 'app-modules-holder',
  standalone: true,
  imports: [ModuleHolderComponent],
  templateUrl: './modules-holder.component.html',
  styleUrl: './modules-holder.component.scss'
})
export class ModulesHolderComponent implements OnInit {

  @ViewChild('moduleHolder', { read: ViewContainerRef, static: true }) moduleHolder!: ViewContainerRef;

  public modules = [PenComponent, PenComponent, PenComponent];

  constructor() { }

  ngOnInit(): void {
    
  }
     
}
