import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawingBoardComponent } from "./drawing-board/drawing-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawingBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'paint';
}
