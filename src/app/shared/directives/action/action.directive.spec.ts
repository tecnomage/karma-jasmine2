import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
describe(ActionDirective.name, () => {
    
    let fixture: ComponentFixture<ActionDirectiveTestComponent>;
    let component: ActionDirectiveTestComponent;
    
    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule],
    }).compileComponents();
    
    fixture= TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
});

  it(`(D) (@Output appAction)
   should emit event with payload when ENTER key is pressed`, () => {
    const divEl: HTMLElement = fixture.nativeElement
    .querySelector('.dummy-component');

    const event = new KeyboardEvent('keyup', {  key: 'Enter' });
    divEl.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true);
   })

   it(`(D) (@Output appAction)
   should emit event with payload when mouse its clicked`, () => {
    const  divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    divEl.dispatchEvent(new MouseEvent('click'));

    expect(component.hasEvent()).toBe(true);
    
   })

});


@Component({
    template:`<div
    class="dummy-component"
    (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent{
    private event: Event = null;
    
    public actionHandler(event:Event){
        this.event = event;
    }
    
    public hasEvent():boolean{
        return !!this.event;
    }
}