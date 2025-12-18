import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-incrementador',
  standalone: true,
  imports: [FormsModule,FontAwesomeModule],
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.scss'
})
export class IncrementadorComponent {
  faMinus = faMinus;
faPlus = faPlus;

  @Input() cantidad: number = 1;
  @Output() change = new EventEmitter<number>();
  cambiarValor(valor: number) {
    if (this.cantidad <= 0 && valor < 0) {
      this.cantidad = 0;
      return;
    }
    this.cantidad = this.cantidad + valor;
    this.change.emit(this.cantidad);
  }
  cambioValor() {
     this.change.emit(this.cantidad);
  }

}
