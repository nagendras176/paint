import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PaintComponent} from './paint/paint.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PaintComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'paint';
}
