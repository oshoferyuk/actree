import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: '[app-underlined-input]',
  templateUrl: './underlined-input.component.html',
  styleUrls: ['./underlined-input.component.scss']
})
export class UnderlinedInputComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

}
