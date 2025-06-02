import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Memoria } from '../../services/memoria.service';

@Component({
  selector: 'app-memoria-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <img *ngIf="memoria.midia" [src]="'http://localhost:3000/uploads/' + memoria.midia" alt="Imagem" />
      <h3>{{ memoria.titulo }}</h3>
      <p>{{ memoria.descricao }}</p>
      <a [routerLink]="['/detalhe', memoria.id]">Ver detalhes</a>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin: 0.5rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  `]
})
export class MemoriaCardComponent {
  @Input() memoria!: Memoria;
}
