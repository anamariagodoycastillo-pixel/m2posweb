import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './ng-input-modal.component.html',
  styleUrl: './ng-input-modal.component.scss'
})
export class NgInputModalComponent {
  faTimes = faTimes;

  @Input() isOpen = false;
  @Input() titulo: string = 'Ingresar Valor';
  @Input() placeholder: string = 'Escriba aquí...';
  @Input() valorInicial: string = '';

  @Output() valorIngresado = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  valor: string = '';

  ngOnInit(): void {
    this.valor = this.valorInicial;
  }

  aceptar() {
    this.valorIngresado.emit(this.valor.trim());
    this.close(); // opcional
  }

  close() {
    this.closeModal.emit();
  }
}
