import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileInvoiceDollar, faMoneyBillWave, faStore, faTags, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente-info',
  imports: [CommonModule, FontAwesomeModule], // agregamos esto
  templateUrl: './clienteInfo.component.html',
  styleUrl: './clienteInfo.component.scss'
})
export class ClienteInfoComponent  {
  faUserCircle=faUserCircle;
  faMoneyBillWave = faMoneyBillWave;
faTags = faTags;
faStore = faStore;
faFileInvoiceDollar = faFileInvoiceDollar;
  @Input() cliente!: any;
  @Input() condicionPago!: any;
  @Input() listaPrecio!: any;
  @Input() sucursal!: any;
  @Input() numeracion!: any;

  @Input() formatearNombre!: (nombre: string, max: number) => string;
  @Input() formatearNumero!: (numero: number, digitos: number) => string;

  get comprobanteNumero(): string {
  if (!this.numeracion?.serie || this.numeracion?.ultimoNumero == null) {
    return '';
  }
  return `${this.numeracion.serie}-${this.formatearNumero(this.numeracion.ultimoNumero + 1, 7)}`;
}
}
