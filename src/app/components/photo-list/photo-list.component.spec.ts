import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/tests/build-photo-list';
import { PhotoListComponent } from './photo-list.component';
import PhotoListModule from './photo-list.module';
import {of} from 'rxjs/internal/observable/of';

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent> = null;
  let component: PhotoListComponent = null;
  let service: PhotoBoardService = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it(`Should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should diplay board when data arrivers`, () => {
      const photos = buildPhotoList();
      spyOn(service, 'getPhotos')
      .and.returnValue(of(photos));
      
      fixture.detectChanges();
      const board = fixture.nativeElement.querySelector('app-photo-board');
      const loader = fixture.nativeElement.querySelector('.loader');
      expect(board).not.toBeNull();
      expect(loader).toBeNull();
  });


  it(`(D) Should diplay loader while waiting for data`, () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos')
    .and.returnValue(null);
    
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).toBeNull();
    expect(loader).not.toBeNull();
});
});
