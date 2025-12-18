import { CommonModule } from "@angular/common";
import { Component,       EventEmitter, Input, OnInit, Output, ViewContainerRef, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { InputDebounceComponent } from "../inputDebounce/inputDebounce.component";
import { Cliente } from '../../interfaces/clientes.interface';
import { ClientesService } from "../../services/clientes.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cliente-search",
  standalone: true,
  imports: [CommonModule, InputDebounceComponent, FontAwesomeModule],
  templateUrl: "./ng-cliente-search.component.html",
  styleUrl: "./ng-cliente-search.component.scss"
})
export class NgClienteSearchComponent implements OnInit {
  faTimes = faTimes;
  size = "medium";
  delay=200;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cliente = new EventEmitter<Cliente>();

  clientes: Cliente[] = [];
  _clientesService = inject(ClientesService);

  ngOnInit(): void {
    this.clientes =[];

    this.buscar('');
  }

selectCliente(cliente: Cliente) {
  this.cliente.emit(cliente);
}
trackCliente(index: number, cliente: Cliente): number {
  return cliente.clienteSucursalId; // Assuming cliente has a unique ID
}

  close() {
    this.closeModal.emit();
  }

  buscar(termino: string) {

    this._clientesService.search(1, 10, termino)
    .pipe(debounceTime(1500), distinctUntilChanged())
    .subscribe((response: any) => {
      console.log(response);
      this.clientes = response.clientes as Cliente[];
    });
    /*   debounceTime(300);
    distinctUntilChanged(); */
    console.log(termino);
  }
}
