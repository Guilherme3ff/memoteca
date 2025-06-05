import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Memoria } from '../../services/memoria.service';

@Component({
  selector: 'app-memoria-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="card" role="article">
      <figure *ngIf="memoria.midia; else noImage">
        <img 
          [src]="'http://localhost:3000/uploads/' + memoria.midia" 
          [alt]="'Imagem relacionada a ' + memoria.titulo" 
          loading="lazy"
        />
      </figure>
      <ng-template #noImage>
        <div class="no-image">Sem imagem disponível</div>
      </ng-template>

      <h3>{{ memoria.titulo }}</h3>
      <p>{{ memoria.descricao }}</p>

      <div class="actions">
        <a 
          class="details-link" 
          [routerLink]="['/detalhe', memoria.id]" 
          [attr.aria-label]="'Ver detalhes da memória ' + memoria.titulo"
        >
          Ver detalhes
        </a>
        <button 
          (click)="onEditar()" 
          [attr.aria-label]="'Editar memória ' + memoria.titulo"
        >
          Editar
        </button>
        <button 
          (click)="onExcluir()" 
          class="btn-excluir"
          [attr.aria-label]="'Excluir memória ' + memoria.titulo"
        >
          Excluir
        </button>
      </div>
    </article>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin: 0.5rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      background: #fff;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 320px;
    }
    figure {
      margin: 0;
    }
    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      object-fit: cover;
    }
    .no-image {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
      color: #888;
      border-radius: 4px;
      font-style: italic;
      font-size: 0.9rem;
    }
    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }
    p {
      margin: 0;
      color: #555;
      font-size: 1rem;
      flex-grow: 1;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .details-link {
      text-decoration: none;
      color: #007bff;
      font-weight: 600;
      transition: color 0.3s ease;
    }
    .details-link:hover,
    .details-link:focus {
      color: #0056b3;
      outline: none;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    button:hover,
    button:focus {
      outline: none;
    }
    button:not(.btn-excluir) {
      background-color: #ffc107; /* amarelo para editar */
      color: #222;
    }
    button:not(.btn-excluir):hover {
      background-color: #e0a800;
    }
    .btn-excluir {
      background-color: #dc3545; /* vermelho para excluir */
      color: #fff;
    }
    .btn-excluir:hover {
      background-color: #b02a37;
    }
  `]
})
export class MemoriaCardComponent {
  @Input() memoria!: Memoria;

  @Output() editar = new EventEmitter<Memoria>();
  @Output() excluir = new EventEmitter<Memoria>();

  onEditar() {
    this.editar.emit(this.memoria);
  }

  onExcluir() {
    this.excluir.emit(this.memoria);
  }
}
