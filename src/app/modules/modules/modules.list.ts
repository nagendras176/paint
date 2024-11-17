import {PenComponent} from './pen/pen.component';
import { EraserComponent } from './eraser/eraser.component';
import {DownloadComponent} from './download/download.component'


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
    }
]