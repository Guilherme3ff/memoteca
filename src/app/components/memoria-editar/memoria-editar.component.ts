import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemoriaService, Memoria } from '../../services/memoria.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-memoria-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div *ngIf="memoria">
      <h2>Editar Memória</h2>

      <form (ngSubmit)="salvar()">
        <label>
          Título:
          <input type="text" [(ngModel)]="memoria.titulo" name="titulo" required />
        </label>

        <label>
          Descrição:
          <textarea [(ngModel)]="memoria.descricao" name="descricao" required></textarea>
        </label>

        <label>
          Data:
          <input type="date" [(ngModel)]="memoria.data" name="data" required />
        </label>

        <label>
          Autor:
          <input type="text" [(ngModel)]="memoria.autor" name="autor" required />
        </label>

        <label>
          Imagem:
          <input type="file" (change)="onFileSelected($event)" />
        </label>

        <button type="submit">Salvar</button>
        <button type="button" (click)="cancelar()">Cancelar</button>
      </form>
    </div>

    <p *ngIf="!memoria">Carregando...</p>
  `
})
export class MemoriaEditarComponent implements OnInit {
  memoria!: Memoria;
  arquivoSelecionado?: File;

  constructor(
    private route: ActivatedRoute,
    private memoriaService: MemoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.memoriaService.getMemoria(id).subscribe({
        next: (data) => this.memoria = data,
        error: (err) => console.error('Erro ao carregar memória', err),
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
    }
  }

  salvar() {
    if (!this.memoria.id) return;

    if (this.arquivoSelecionado) {
      this.memoria.midia = this.arquivoSelecionado;
    }

    this.memoriaService.updateMemoria(this.memoria.id, this.memoria).subscribe({
      next: () => {
        alert('Memória atualizada com sucesso!');
        this.router.navigate(['/detalhe', this.memoria.id]);
      },
      error: (err) => {
        console.error('Erro ao atualizar memória', err);
        alert('Erro ao atualizar a memória. Tente novamente.');
      }
    });
  }

  cancelar() {
    if (this.memoria?.id) {
      this.router.navigate(['/detalhe', this.memoria.id]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
