import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PhotoFrameModule } from './../photo-frame/photo-frame.module';
import { CommonModule } from '@angular/common';
import { PhotoBoardComponent } from './photo-board.component';
import { NgModule } from "@angular/core";
import { PhotoBoardService } from './services/photo-board.service';

@NgModule({
    declarations: [PhotoBoardComponent],
    imports: [
        CommonModule,
        PhotoFrameModule,
        HttpClientModule
    ],
    exports: [PhotoBoardComponent],
    providers: [PhotoBoardService],
})
export class PhotoBoardModule {}