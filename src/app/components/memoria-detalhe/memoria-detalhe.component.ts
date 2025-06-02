import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memoria-detalhe',
  template: `
    <div *ngIf="memoria">
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
    </div>

    <p *ngIf="!memoria">Carregando memória...</p>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class MemoriaDetalheComponent implements OnInit {
  memoria: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/memorias/${id}`).subscribe({
        next: (data) => (this.memoria = data),
        error: (err) => console.error('Erro ao carregar memória', err),
      });
    }
  }
}
