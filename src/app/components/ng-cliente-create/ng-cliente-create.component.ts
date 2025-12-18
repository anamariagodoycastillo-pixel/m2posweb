import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, inject, signal } from "@angular/core";
import { debounceTime, distinctUntilChanged, forkJoin } from "rxjs";
import { InputDebounceComponent } from "../inputDebounce/inputDebounce.component";
import { Cliente } from '../../interfaces/clientes.interface';
import { ClientesService } from "../../services/clientes.service";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CondicionPago } from "../../interfaces/condicionPago.interface";
import { ListaPrecio } from "../../interfaces/listaPrecio.interface";
import { CondicionPagoService } from "../../services/condicionPago.service";
import { ListaPrecioService } from "../../services/listaPrecio.service";
import { paises_codigos } from "../../interfaces/codigoPaises";
import { CardComponent } from "../card/card.component";
import { faFileCirclePlus, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-cliente-create",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CardComponent,FontAwesomeModule,],
  templateUrl: "./ng-cliente-create.component.html",
  styleUrl: "./ng-cliente-create.component.scss"
})
export class NgClienteCreateComponent implements OnInit {
  faTimes = faTimes;
  faFileCirclePlus = faFileCirclePlus;
  faXmark = faXmark;

  size = "large";
  delay = 200;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cliente = new EventEmitter<Cliente>();

  listas = signal<ListaPrecio[]>([])
  formas = signal<CondicionPago[]>([])
  clienteForm: FormGroup ;
  paises :any[]=[...paises_codigos]

  private fb = inject(FormBuilder)
  private _listaPrecioService = inject(ListaPrecioService)
  private _formadocumentoService = inject(CondicionPagoService)
  private _clienteService = inject(ClientesService)
  constructor() {
     // Initialize the property in the constructor
     this.clienteForm = this.initForm()

     forkJoin([
       this._listaPrecioService.findAll(),
       this._formadocumentoService.findAll(),

     ]).subscribe(([listas, formas]) => {
       this.listas.set(listas);
       this.formas.set(formas);
       if (listas.length > 0) {
        this.clienteForm.get('listaPrecioId')?.setValue(listas[0].id);
      }

      if (formas.length > 0) {
        this.clienteForm.get('condicionPagoId')?.setValue(formas[0].id);
      }
     });

   }
   ngOnInit() {
    this.clienteForm.get('naturalezaReceptor')?.valueChanges.subscribe(value => {
      const tipoDocIdentidadControl = this.clienteForm.get('tipoDocIdentidad');

      if (value == 2) {
        // Si es Persona Física, hacer obligatorio
        tipoDocIdentidadControl?.setValidators([Validators.required]);
      } else {
        // Si es otro tipo, quitar la validación y resetear el campo
        tipoDocIdentidadControl?.clearValidators();
        tipoDocIdentidadControl?.setValue(null);
      }
      tipoDocIdentidadControl?.updateValueAndValidity();
    });

  }

  initForm(){
    return this.fb.group({
      razonSocial: [null, [Validators.required, Validators.minLength(7)]],
      nombreFantasia: [null ],
      nroDocumento: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
      email: [null, [Validators.required, Validators.email]],
      excentoIva: [false],
      predeterminado: [false],
      propietario: [false],
      tipoOperacionId: [null, [Validators.required, Validators.pattern(/^[1-4]$/)]],
      naturalezaReceptor: [null, [Validators.required, Validators.pattern(/^[1-2]$/)]],//1= contribuyente    2= no contribuyente
      codigoPais: ['PRY', [Validators.required, Validators.maxLength(3)]],
      tipoContribuyente: [null, [Validators.required, Validators.pattern(/^[1-2]$/)]], //1Persona Física 2Persona Jurídica
      tipoDocIdentidad: [null],
       // Sucursal principal
        nombre: [''],
        direccion: ['', Validators.required],
        telefono: [''],
        cel: [''],
        latitud: [0],
        obs: '',
        longitud: [0],
        listaPrecioId: [1, Validators.required],
        condicionPagoId: [1, Validators.required],

    });
  }




  getListas() {
    this._listaPrecioService.findAll().subscribe((resp: any) => this.listas.set(resp));
  }
  getCondicionPago() {
    this._formadocumentoService.findAll().subscribe((resp: any) => this.formas.set(resp));
  }
  onSubmit(e: Event) {
    e.preventDefault()
    console.log(this.clienteForm)
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      // Log the errors to the console
      console.log(this.getFormErrors());

      return;
    }
    const clienteData: any = this.clienteForm.value;
    Swal.showLoading();

    this._clienteService.createClienteSucursalForm({
      ...clienteData
    }).subscribe({
      next: (cliente) => {
         Swal.close()
        this.cliente.emit(cliente);
        this.isOpen = false;
      },
      error: (error) => {
         Swal.close()
        console.error(error)
        Swal.fire("Error", error, "error");
      },
      complete: () => {
        this.clienteForm = this.fb.group({});
      }// Use 'complete' instead of 'finally'
    });
  }
  getFormErrors() {
    const errors: { field: string; errors: any }[] = [];

    Object.keys(this.clienteForm.controls).forEach(key => {
      const control = this.clienteForm.get(key);
      if (control && control.invalid && (control.touched || control.dirty)) {
        errors.push({ field: key, errors: control.errors });
      }
    });

    return errors;
  }
  toUpeCaseEvent(evento: string) {
    return evento.toLocaleUpperCase();
  }
  close() {
    this.closeModal.emit();
  }
}
