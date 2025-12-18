// resumen-credito.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCircleCheck, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resumen-credito',
  standalone: true,
  imports: [CommonModule ,FontAwesomeModule],
  templateUrl: './app-resumen-credito.component.html',
})
export class ResumenCreditoComponent {
  faMoneyBillWave=faMoneyBillWave;
faTriangleExclamation = faTriangleExclamation;
  faCircleCheck = faCircleCheck;
faHourglassHalf = faHourglassHalf;
  @Input() resumen!: any;
  @Input() titulo: string = '';
}
