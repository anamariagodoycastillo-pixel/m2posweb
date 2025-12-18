import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { InputDebounceComponent } from "../inputDebounce/inputDebounce.component";
import { ListaPrecio } from "../../interfaces/listaPrecio.interface";
import { ListaPrecioService } from "../../services/service.index";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
@Component({
  selector: "app-lista-precio-all",
  standalone: true,
  imports: [CommonModule, InputDebounceComponent, FontAwesomeModule],
  templateUrl: "./ng-lista-precio-all.component.html",
  styleUrl: "./ng-lista-precio-all.component.scss"
})
export class NgListaPrecioSAllComponent implements OnInit {
  faTimes = faTimes;
  size = "medium";
  delay = 200;
  @Input() selectedListaPrecio: ListaPrecio | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() listaPrecio = new EventEmitter<ListaPrecio>();
  LISTAPRECIODEFAULT: ListaPrecio = {
    id: 0,
    descripcion: 'No seleccionado',
    color: '#fff',
    predeterminado: true,
    empresaId: 0,
    activo: true
  };
  listasPrecio: ListaPrecio[] = [];
  listasPrecioAux: ListaPrecio[] = [];
  _listasPrecioService = inject(ListaPrecioService);

  ngOnInit(): void {
    this.listasPrecio = [];

    this.buscar("");
  }

  selectListaPrecio(listaPrecio: ListaPrecio) {
    this.listaPrecio.emit(listaPrecio);
  }
  trackListaPrecio(index: number, listaPrecio: ListaPrecio): number {
    return listaPrecio.id; // Assuming listaPrecio has a unique ID
  }

  close() {
    this.closeModal.emit();
  }

buscar(termino: string) {
  this._listasPrecioService.findAll().subscribe(resp => {
    // Insertar la opción predeterminada al principio
    const listasConDefault = [this.LISTAPRECIODEFAULT, ...resp];

    if (termino) {
      this.listasPrecioAux = listasConDefault.filter((listaPrecio: ListaPrecio) => {
        return listaPrecio.descripcion.toLowerCase().includes(termino.toLowerCase());
      });
    } else {
      this.listasPrecioAux = listasConDefault;
    }

    this.listasPrecio = this.listasPrecioAux;
  });
}
}
