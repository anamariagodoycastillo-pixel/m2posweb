import { Component, EventEmitter, Input, OnInit, Output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-establecimiento-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './ng-establecimiento-modal.component.html',
  styleUrl: './ng-establecimiento-modal.component.scss',
})
export class NgEstablecimientoModalComponent implements OnInit {
  faTimes = faTimes;
  size = 'medium';

  @Input() isOpen = false;
  @Input() codDepartamento: number | null = null;
  @Input() codCiudad: number | null = null;
  @Input() codBarrio: number | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<{
    codDepartamento: number;
    codCiudad: number;
    codBarrio: number;
    departamento: any;
    ciudad: any;
    barrio: any;
  }>();

  private _establecimiento = inject(EstablecimientoService);
  private fb = inject(FormBuilder);

  form!: FormGroup;

  departamentos: any[] = [];
  ciudades: any[] = [];
  barrios: any[] = [];



  ngOnInit(): void {
    this.form = this.fb.group({
      codDepartamento: [this.codDepartamento, Validators.required],
      codCiudad: [this.codCiudad, Validators.required],
      codBarrio: [this.codBarrio, Validators.required],
    });

    this._establecimiento.getDepartamentos().subscribe(departamentos => {
      console.log('Departamentos cargados:', departamentos);
      this.departamentos = departamentos.sort((a: any, b: any) =>
        a.descripcion.localeCompare(b.descripcion)
      );
    });

    this.onChangeCodDepartamento();
    this.onChangeCodCiudad();

    if (this.codDepartamento) {
      this._establecimiento.getCiudades(this.codDepartamento).subscribe(ciudades => {
        this.ciudades = ciudades;
        console.log('ciudades cargadas:', ciudades);
        if (this.codCiudad) {
          this._establecimiento.getBarrios(this.codCiudad).subscribe(barrios => {
            this.barrios = barrios;
          });
        }
      });
    }
  }

  onChangeCodDepartamento(): void {
    this.form.get('codDepartamento')?.valueChanges.subscribe(value => {
      if (value) {
        this._establecimiento.getCiudades(value).subscribe(ciudades => {
          this.ciudades = ciudades.sort((a: any, b: any) =>
            a.descripcion.localeCompare(b.descripcion)
          );
          const currentCiudad = this.form.get('codCiudad')?.value;
          const existe = this.ciudades.some(c => c.codigo === currentCiudad);
          this.form.get('codCiudad')?.setValue(existe ? currentCiudad : this.ciudades[0]?.codigo || null);
        });

      }
    });
  }

  onChangeCodCiudad(): void {
    this.form.get('codCiudad')?.valueChanges.subscribe(value => {
      if (value) {
        this._establecimiento.getBarrios(value).subscribe(barrios => {
          this.barrios = barrios.sort((a: any, b: any) =>
            a.descripcion.localeCompare(b.descripcion)
          );
          const currentBarrio = this.form.get('codBarrio')?.value;
          const existe = this.barrios.some(b => b.codigo === currentBarrio);
          this.form.get('codBarrio')?.setValue(existe ? currentBarrio : this.barrios[0]?.codigo || null);
        });
      }
    });
  }

  close() {
    this.closeModal.emit();
  }

  confirmarSeleccion() {
    if (!this.form.valid) {
      console.warn('Formulario inválido', this.form.value);
      return;
    }

    const { codDepartamento, codCiudad, codBarrio } = this.form.value;

    const departamento = this.departamentos.find(dep => dep.codigo == +codDepartamento) || null;
    const ciudad = this.ciudades.find(c => c.codigo == +codCiudad) || null;
    const barrio = this.barrios.find(b => b.codigo == +codBarrio) || null;

    console.log('Emitiendo selección:', {
      codDepartamento,
      codCiudad,
      codBarrio,
      departamento,
      ciudad,
      barrio
    });

    this.confirmar.emit({
      codDepartamento,
      codCiudad,
      codBarrio,
      departamento,
      ciudad,
      barrio
    });
  }
}
