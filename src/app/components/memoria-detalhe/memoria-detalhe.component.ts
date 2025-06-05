import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memoria-detalhe',
  template: `
    <div *ngIf="memoria; else carregando">
      <h2>{{ memoria.titulo }}</h2>
      <p>{{ memoria.descricao }}</p>
      <p><strong>Data:</strong> {{ memoria.data }}</p>
      <p><strong>Autor:</strong> {{ memoria.autor }}</p>

      <img
        *ngIf="memoria.midia"
        [src]="'http://localhost:3000/uploads/' + memoria.midia"
        alt="Imagem da memória"
        style="max-width: 100%; height: auto;"
      />

      <div class="actions">
        <button 
          (click)="editarMemoria()" 
          [attr.aria-label]="'Editar memória ' + memoria.titulo"
        >
          Editar
        </button>
        <button 
          (click)="excluirMemoria()" 
          class="btn-excluir"
          [attr.aria-label]="'Excluir memória ' + memoria.titulo"
        >
          Excluir
        </button>
      </div>
    </div>

    <ng-template #carregando>
      <p>Carregando memória...</p>
    </ng-template>
  `,
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .actions {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover,
    button:focus {
      outline: none;
    }
    button:not(.btn-excluir) {
      background-color: #ffc107;
      color: #222;
    }
    button:not(.btn-excluir):hover {
      background-color: #e0a800;
    }
    .btn-excluir {
      background-color: #dc3545;
      color: white;
    }
    .btn-excluir:hover {
      background-color: #b02a37;
    }
  `]
})
export class MemoriaDetalheComponent implements OnInit {
  memoria: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/memorias/${id}`).subscribe({
        next: (data) => (this.memoria = data),
        error: (err) => console.error('Erro ao carregar memória', err),
      });
    }
  }

  editarMemoria() {
    if (this.memoria?.id) {
      this.router.navigate(['/editar', this.memoria.id]);
    }
  }

  excluirMemoria() {
    if (!this.memoria?.id) return;

    const confirmacao = confirm(`Tem certeza que deseja excluir a memória "${this.memoria.titulo}"?`);
    if (confirmacao) {
      this.http.delete(`http://localhost:3000/memorias/${this.memoria.id}`).subscribe({
        next: () => {
          alert('Memória excluída com sucesso!');
          this.router.navigate(['/']); // volta para lista ou outra página
        },
        error: (err) => {
          console.error('Erro ao excluir memória', err);
          alert('Erro ao excluir a memória. Tente novamente.');
        }
      });
    }
  }
}
