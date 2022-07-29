import { PhotoFrameModule } from './photo-frame.module';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PhotoFrameComponent} from './photo-frame.component';

describe(PhotoFrameComponent.name, () => {
    let fixture: ComponentFixture<PhotoFrameComponent>= null;
  let component: PhotoFrameComponent;

  beforeEach( async () => {

    await TestBed.configureTestingModule({
        imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    //aciona o onInit
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) once 
  when called multiples times within debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    
    component.like();
    component.like();
    
    tick(500);
    expect(times).toBe(1);

  }));

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) two times
  when called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    
    component.like();
    tick(500);
    component.like();
    tick(500);
    
    expect(times).toBe(2);

  }
    ));



});