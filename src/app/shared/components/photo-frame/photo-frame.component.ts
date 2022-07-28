import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
})
export class PhotoFrameComponent {
  @Output() public liked: EventEmitter<void> = new EventEmitter();
  @Input() public description: string = '';
  @Input() public src: string = '';
  @Input() public likes: number = 0;

  ngOnInit() {
    console.log(this.description);
    console.log(this.src);
    console.log(this.likes);
  }
  constructor() {}

  public like(): void {
    console.log('like photo frame');
    this.liked.emit();
  }
}
