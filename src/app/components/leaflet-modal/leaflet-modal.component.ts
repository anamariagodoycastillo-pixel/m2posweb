import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
 import L from 'leaflet';
import { DefaultIcon } from '../../leaflet/leaflet-icon';
import { faCircleXmark, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-leaflet-modal',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './leaflet-modal.component.html',
  styleUrl: './leaflet-modal.component.scss'
})
export class LeafletModalComponent implements AfterViewInit, OnDestroy {
  faTrash=faTrash;
  faSave = faSave;
faCircleXmark=faCircleXmark;
  // Coordenadas iniciales (Input desde el componente padre)
  @Input() lat: number = -25.2637; // Latitud por defecto
  @Input() lng: number = -57.5759; // Longitud por defecto
  @Output() close = new EventEmitter<void>();

  // Output que emite las coordenadas seleccionadas al padre
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();

  // Variables internas para el mapa y el marcador
  private map!: L.Map;        // Mapa de Leaflet
  private marker!: L.Marker;  // Marcador en el mapa

  // Hook que se ejecuta después de que la vista ha sido inicializada
ngAfterViewInit(): void {
  L.Marker.prototype.options.icon = DefaultIcon;


  this.map = L.map('leaflet-map').setView([this.lat, this.lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map);

  this.marker.on('dragend', () => {
    const position = this.marker.getLatLng();
    this.lat = position.lat;
    this.lng = position.lng;
  });
}

  // Hook que se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Limpia el mapa de la memoria para evitar fugas
    }
  }

  // Método que se llama al confirmar la selección de ubicación
  confirm(): void {
    // Emite las coordenadas seleccionadas al componente padre
    this.locationSelected.emit({ lat: this.lat, lng: this.lng });
    this.closeModal(); // Cierra el modal
  }

  // Cierra el modal manipulando el DOM directamente (útil si no usas Angular Material o Bootstrap JS)
  closeModal(): void {
    this.close.emit();  // Avisar al padre que se cerró el modal

    const modal = document.getElementById('leafletModal'); // Busca el modal por ID
    if (modal) {
      modal.classList.remove('show');         // Quita la clase de visualización
      modal.style.display = 'none';           // Lo oculta
      document.body.classList.remove('modal-open'); // Quita efectos del fondo
      document.body.style.overflow = '';            // Restaura el scroll
      document.body.style.paddingRight = '';        // Restaura padding
    }
  }
}
