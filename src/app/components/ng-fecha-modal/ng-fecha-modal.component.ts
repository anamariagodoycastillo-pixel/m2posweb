import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fecha-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './ng-fecha-modal.component.html',
  styleUrl: './ng-fecha-modal.component.scss',
})
export class NgFechaModalComponent implements OnInit {
  faTimes = faTimes;
  size = 'small';

  @Input() isOpen = false;
  @Input() fechaInicial: string | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<{ fecha: string }>();

  private fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [this.fechaInicial, Validators.required]
    });
  }

  close() {
    this.closeModal.emit();
  }

  confirmarSeleccion() {
    if (!this.form.valid) {
      return;
    }

    const { fecha } = this.form.value;
    this.confirmar.emit({ fecha });
  }
}
