import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-reparto-list-item',
  template: `
    <div class="reparto-list-item">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  `,
  styles: [
    `
    .reparto-list-item {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 8px;
    }

    h2 {
      font-size: 18px;
      margin: 0 0 4px;
    }

    p {
      margin: 0;
      color: #666;
    }
    `
  ]
})
export class RepartoListItemComponent {
  @Input() title: string = 'Placeholder Title';
  @Input() description: string = 'This is a placeholder description.';
}