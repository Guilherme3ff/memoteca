import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemoriaService, Memoria } from '../../services/memoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Cadastrar Memória</h1>

    <form (ngSubmit)="salvar()" #memoriaForm="ngForm" style="max-width: 400px;">
      <label>
        Título:<br />
        <input name="titulo" [(ngModel)]="memoria.titulo" required />
      </label><br /><br />

      <label>
        Descrição:<br />
        <textarea name="descricao" [(ngModel)]="memoria.descricao" required></textarea>
      </label><br /><br />

      <label>
        Data:<br />
        <input type="date" name="data" [(ngModel)]="memoria.data" required />
      </label><br /><br />

      <label>
        Autor:<br />
        <input name="autor" [(ngModel)]="memoria.autor" required />
      </label><br /><br />

      <label>
        Imagem:<br />
        <input type="file" (change)="onFileSelected($event)" />
      </label><br /><br />

      <button type="submit" [disabled]="memoriaForm.invalid">Salvar</button>
    </form>
  `
})
export class CadastroPage {
  memoria: Memoria = {
    titulo: '',
    descricao: '',
    data: '',
    autor: '',
    midia: undefined
  };

  constructor(private memoriaService: MemoriaService, private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.memoria.midia = file;
    }
  }

  salvar() {
    this.memoriaService.createMemoria(this.memoria).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Erro ao salvar memória:', err)
    });
  }
}
