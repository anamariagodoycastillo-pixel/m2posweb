import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-reparto-page',
  template: `
    <div class="reparto-page">
      <h1>Reparto Management</h1>
      <p>Manage orders and logistics from this page.</p>
    </div>
  `,
  styles: [
    `
    .reparto-page {
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    h1 {
      color: #333;
    }
    `
  ]
})
export class RepartoPageComponent {}