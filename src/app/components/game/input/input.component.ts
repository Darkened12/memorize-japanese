import { Component, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  inputData!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}


  @Output() inputEmitter = new EventEmitter<string>();


  onSubmit() {
    this.inputEmitter.emit(this.inputData);
    this.inputData = '';
  }

  ngAfterViewInit() {
    const inputElement = this.elementRef.nativeElement.querySelector('#main-input');
    this.renderer.selectRootElement(inputElement).focus();
  }
  


}
