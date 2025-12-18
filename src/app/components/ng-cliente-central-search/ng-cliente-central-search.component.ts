import { CommonModule } from "@angular/common";
import { Component,       EventEmitter, Input, OnInit, Output, ViewContainerRef, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { InputDebounceComponent } from "../inputDebounce/inputDebounce.component";
import { ClientesService } from "../../services/clientes.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cliente-central-search",
  standalone: true,
  imports: [CommonModule, InputDebounceComponent, FontAwesomeModule],
  templateUrl: "./ng-cliente-central-search.component.html",
  styleUrl: "./ng-cliente-central-search.component.scss"
})
export class NgClienteCentralSearchComponent implements OnInit {
  faTimes = faTimes;
  size = "medium";
  delay=200;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cliente = new EventEmitter<any>();

  clientes: any[] = [];
  _clientesService = inject(ClientesService);

  ngOnInit(): void {
    this.clientes =[];

    this.buscar('');
  }

selectCliente(cliente: any) {
  this.cliente.emit(cliente);
}
trackCliente(index: number, cliente: any): number {
  return cliente.clienteSucursalId; // Assuming cliente has a unique ID
}

  close() {
    this.closeModal.emit();
  }

  buscar(termino: string) {

    this._clientesService.searchCentral(1, 10, termino)
    .pipe(debounceTime(1500), distinctUntilChanged())
    .subscribe((response: any) => {
      console.log(response);
      this.clientes = response.clientes as any[];
    });

    console.log(termino);
  }
}
