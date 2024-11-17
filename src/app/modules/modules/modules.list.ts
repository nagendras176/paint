import {PenComponent} from './pen/pen.component';
import { EraserComponent } from './eraser/eraser.component';
import {DownloadComponent} from './download/download.component';
import {ClearBoardComponent} from './clear-board/clear-board.component';


export const modulesList = [
    {
        module: PenComponent,
        default: true
    },
    {
        module: EraserComponent,
        default: false
    },
    {
        module: DownloadComponent,
        default: false
    },
    {
        module: ClearBoardComponent,
        default: false
    }
]