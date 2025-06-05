import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoriaService, Memoria } from '../../services/memoria.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  memorias: Memoria[] = [];
  private uploadsUrl = 'http://localhost:3000/uploads/';
  imagemSelecionada: string | null = null;

  constructor(private memoriaService: MemoriaService, private router: Router) {}

  ngOnInit() {
    this.carregarMemorias();
  }

  carregarMemorias() {
    this.memoriaService.getMemorias().subscribe({
      next: (data) => {
        this.memorias = data.map(memoria => {
          let midiaUrl: string | undefined;

          if (typeof memoria.midia === 'string' && memoria.midia.trim() !== '') {
            midiaUrl = this.uploadsUrl + memoria.midia;
          }

          return { ...memoria, midia: midiaUrl };
        });
      },
      error: (err) => console.error('Erro ao carregar memórias', err),
    });
  }

  getMidiaUrl(midia: string | File | undefined): string | undefined {
    if (typeof midia === 'string') {
      return midia;
    }
    return undefined;
  }

  abrirImagem(url: string) {
    this.imagemSelecionada = url;
  }

  fecharImagem() {
    this.imagemSelecionada = null;
  }

  editarMemoria(id: number) {
  this.router.navigate(['/editar', id]);
}


  excluirMemoria(memoria: Memoria) {
    if (confirm(`Tem certeza que deseja excluir a memória "${memoria.titulo}"?`)) {
      if (memoria.id) {
        this.memoriaService.deleteMemoria(memoria.id).subscribe({
          next: () => {
            alert('Memória excluída com sucesso!');
            this.carregarMemorias(); // Atualiza a lista após exclusão
          },
          error: (err) => {
            console.error('Erro ao excluir memória', err);
            alert('Erro ao excluir memória. Tente novamente.');
          }
        });
      }
    }
  }
}
