import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[appAction]"
})
export class ActionDirective {
    @Output() public appAction: EventEmitter<Event> = new EventEmitter();
    
    @HostListener('click', ['$event'])
    public HandleClick(event: Event){
    this.appAction.emit(event);
    }

    @HostListener('keyup', ['$event'])
    public handleKeyUp(event: KeyboardEvent){
    this.appAction.emit(event);
    }       
}