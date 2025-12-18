import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileInvoiceDollar, faMoneyBillWave, faStore, faTags, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente-info-pedido',
  imports: [CommonModule, FontAwesomeModule], // agregamos esto
  templateUrl: './clienteInfoPedido.component.html',
  styleUrl: './clienteInfoPedido.component.scss'
})
export class ClienteInfoPedidoComponent  {
  faUserCircle=faUserCircle;
  faMoneyBillWave = faMoneyBillWave;
faTags = faTags;
faStore = faStore;
faFileInvoiceDollar = faFileInvoiceDollar;
  @Input() cliente!: any;
  @Input() condicionPago!: any;
  @Input() listaPrecio!: any;
  @Input() sucursal!: any;

  @Input() formatearNombre!: (nombre: string, max: number) => string;
  @Input() formatearNumero!: (numero: number, digitos: number) => string;


}
