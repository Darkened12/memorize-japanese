import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  inputData!: string;
  @Output() inputEmitter = new EventEmitter<string>();


  onSubmit() {
    this.inputEmitter.emit(this.inputData);
    this.inputData = '';
  }
}