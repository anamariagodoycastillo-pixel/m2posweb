import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus, faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-tabla',
  imports: [CommonModule, FormsModule, FontAwesomeModule], // ✅ Agregar FormsModule acá
  templateUrl: './detalle-tabla.component.html',
  styleUrl: './detalle-tabla.component.scss'
})
export class DetalleTablaComponent {
  @Input() detalles: any[] = [];
  @Input() excentoIva: boolean = false;
  porcDescuentoDetalle: number = 0;

  @Output() onAjusteCantidad = new EventEmitter<{ index: number; delta: number }>();
  @Output() onQuitarProducto = new EventEmitter<number>();
  @Output() onActualizarCabecera = new EventEmitter<void>();
  @Output() onToggleExpand = new EventEmitter<number>();
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  ajusteCantidad(index: number, delta: number) {
    this.onAjusteCantidad.emit({ index, delta });
  }

  quitarProducto(index: number) {
    this.onQuitarProducto.emit(index);
  }


  toggleExpand(index: number) {
    this.onToggleExpand.emit(index);
  }
  trackByVarianteId = (index: number, item: any) => item.varianteId;
  actualizarDescuento(index: number) {
    let detalle = this.detalles[index];
    detalle.porcDescuento = this.porcDescuentoDetalle;
    const porcentaje = detalle.porcDescuento || 0;

    // Definir el tipo de descuento manual
    detalle.tipoDescuento = "DESCUENTO_LINEA";

    // Recalcular el importe de descuento
    detalle.importeDescuento = Math.round(detalle.importeSubtotal * porcentaje / 100);

    // Calcular el total del producto con el nuevo descuento
    detalle.importeTotal = detalle.importeSubtotal - detalle.importeDescuento;

    // Recalcular IVA y otros valores
    let porcIva = +detalle.porcIva;
    let porcIva5 = 0;
    let porcIva10 = 0;
    let porcIvaExenta = 0;
    let porcNeto = 0;

    if (this.excentoIva === true) {
      porcIvaExenta = porcIva === 0 ? detalle.importeTotal : 0;
    } else {
      porcIva5 = porcIva === 5 ? Math.round(detalle.importeTotal / 21) : 0;
      porcIva10 = porcIva === 10 ? Math.round(detalle.importeTotal / 11) : 0;
      porcIvaExenta = porcIva === 0 ? detalle.importeTotal : 0;
      porcNeto = detalle.importeTotal - (porcIva5 + porcIva10);
    }

    detalle.importeIva5 = porcIva5;
    detalle.importeIva10 = porcIva10;
    detalle.importeIvaExenta = porcIvaExenta;
    detalle.importeNeto = porcNeto;
    this.detalles[index].expandido = !this.detalles[index].expandido;
    this.porcDescuentoDetalle = 0;
    // Actualizar totales generales
    this.onActualizarCabecera.emit();
  }
}
