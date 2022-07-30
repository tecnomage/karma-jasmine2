import { PhotoFrameModule } from './photo-frame.module';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
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
  }));

  it(`should display number os likes when (@Input likes) is incremented `,
    () => {
      fixture.detectChanges();
      component.likes++;
      fixture.detectChanges();
      const element: HTMLElement =
        fixture.nativeElement.querySelector('.like-counter');
      expect(element.textContent.trim()).toBe('1');
    });

  it(`should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`should have aria-label with 0 (@Input likes)`, () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`(D) should display image with src and description when bound to properties`, () => {
    const description = 'description';
    const src = 'http://www.google.com/image.jpg';
    component.src = src;
    component.description = description;

    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });


  it(`(D) should display number of likes when clicked`, (done) => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      //component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement
      .querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done();
    });

    const likeButton: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeButton.click();
  });

  it(`(D) should display number of likes when key enter is pressed`, (done) => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
     // component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement
      .querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done();
    });

    const likeButton: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeButton.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
  });
});
