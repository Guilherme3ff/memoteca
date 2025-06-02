import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ memoria?.titulo }}</h2>
    <p>{{ memoria?.descricao }}</p>
    <img *ngIf="memoria?.midia" [src]="'http://localhost:3000/uploads/' + memoria.midia" alt="Imagem da memória" />
  `
})
export class DetalhePage implements OnInit {
  memoria: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/memorias/${id}`).subscribe(data => {
        this.memoria = data;
      });
    }
  }
}
