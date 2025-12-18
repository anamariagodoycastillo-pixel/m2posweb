import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-card',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon?: string; // opcional: FontAwesome icon class o ruta de imagen
}
