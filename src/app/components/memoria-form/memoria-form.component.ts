import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Memoria } from '../../services/memoria.service';

@Component({
  selector: 'app-memoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #memoriaForm="ngForm">
      <input type="text" [(ngModel)]="memoria.titulo" name="titulo" placeholder="Título" required />
      <textarea [(ngModel)]="memoria.descricao" name="descricao" placeholder="Descrição" required></textarea>
      <input type="date" [(ngModel)]="memoria.data" name="data" required />
      <input type="text" [(ngModel)]="memoria.autor" name="autor" placeholder="Autor" required />
      <input type="file" (change)="onFileChange($event)" />
      <button type="submit" [disabled]="!memoriaForm.form.valid">Salvar</button>
    </form>
  `
})
export class MemoriaFormComponent {
  @Output() onSalvar = new EventEmitter<Memoria>();

  memoria: Memoria = {
    titulo: '',
    descricao: '',
    data: '',
    autor: '',
    midia: undefined
  };

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.memoria.midia = input.files[0];
    }
  }

  onSubmit() {
    this.onSalvar.emit(this.memoria);
  }
}
