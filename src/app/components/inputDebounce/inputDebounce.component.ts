import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, map } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [FormsModule,FontAwesomeModule],
  selector: 'input-debounce',
  styles: [`
.input-group input:focus,
.input-group input:hover {
  box-shadow: 0 0 5px var(--primary); // ✅ usa variable del tema
}

.input-group input {
  border-color: var(--border-color); // ✅ usa variable del tema
  background-color: var(--card-bg);
  color: var(--text-color);
}

.input-group:hover input {
  border-color: var(--primary); // ✅ usa variable del tema
}

.borde {
  border-color: var(--primary); // ✅ usa variable del tema
}

.color {
  color: var(--primary); // ✅ usa variable del tema
}



  `],
  template: `
    <div class="input-group" >
            <input type="text" #inputDebounce
                   id="inputDebounce"
                   class="custom-input custom-input-sm"
                   width="100%"
                   [placeholder] = "placeholder"
                   [(ngModel)] = "inputValue"
                   (ngModelChange) = "inputValue = toUpeCaseEvent($event)" >
                   @if(inputValue && inputValue.length > 0 ){
                    <span   class="input-group-text borde">
                                  <fa-icon  [icon]="faTrash" (click)="clearInput()" ></fa-icon>


                    </span>
                   }


    </div>
    `
})

export class InputDebounceComponent {
  faTrash=faTrash;
  @Input() placeholder: string = '';
  @Input() delay: number = 1000;
  @Output() value: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputDebounce') inputDebounce!: ElementRef;
  public inputValue: string = '';

  constructor(private elementRef: ElementRef) {
    const eventStream = fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        map(() => this.inputValue),
        debounceTime(this.delay)
      );

    eventStream.subscribe(input => this.value.emit(input));
  }

  toUpeCaseEvent(evento: string) {
    return evento.toLocaleUpperCase();
  }
  clearInput() {
    this.inputValue = '';
    this.value.emit('')
  }
  enfocar() {
    this.inputDebounce.nativeElement.focus();
  }
}
