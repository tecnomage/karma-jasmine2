import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';



const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'example 1',
      src: '',
    },
    {
      id: 2,
      description: 'example 2',
      src: '',
    },
    {
      id: 3,
      description: 'example 3',
      src: '',
    },
  ],
};

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService],
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

 afterEach(()=>{httpController.verify()} )

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description
    with uppercase`, (done) => {
    
        
        service.getPhotos().subscribe((photos) => {
          console.log (photos)
        expect(photos[0].description).toBe('EXAMPLE 1');
        expect(photos[1].description).toBe('EXAMPLE 2');
        done();
    });
    httpController.expectOne(mockData.api).flush(mockData.data);
  });
});
