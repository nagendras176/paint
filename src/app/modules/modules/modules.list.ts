import {PenComponent} from './pen/pen.component';
import { EraserComponent } from './eraser/eraser.component';


export const modulesList = [
    {
        module: PenComponent,
        default: true
    },
    {
        module: EraserComponent,
        default: false
    }
]