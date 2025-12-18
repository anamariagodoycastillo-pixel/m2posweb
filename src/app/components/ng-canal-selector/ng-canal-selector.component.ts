import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-canal-selector",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./ng-canal-selector.component.html",
  styleUrl: "./ng-canal-selector.component.scss"
})
export class NgCanalSelectorComponent {
  faTimes = faTimes;
baseCanales: string[] = ['web', 'ecommerce', 'whatsapp', 'local', 'instagram', 'facebook', 'telegram'];
  canales: string[] = [];
 @Input() incluirTodos: boolean = false;
  @Input() isOpen = false;
  @Input() canalPorDefecto: string = '';
  @Output() canalSeleccionadoChange = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  canalSeleccionado: string = '';

  ngOnInit(): void {
    this.actualizarCanales();
    this.canalSeleccionado = this.canalPorDefecto || this.canales[0];
  }

  actualizarCanales() {
    this.canales = this.incluirTodos
      ? ['todos', ...this.baseCanales]
      : [...this.baseCanales];

    // Asegura que canalSeleccionado siga existiendo
    if (!this.canales.includes(this.canalSeleccionado)) {
      this.canalSeleccionado = this.canales[0];
    }
  }


  seleccionarCanal(canal: string) {
    this.canalSeleccionado = canal;
    this.canalSeleccionadoChange.emit(canal);
  }


  close() {
    this.closeModal.emit();
  }
}
