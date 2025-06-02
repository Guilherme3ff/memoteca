import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Memoria {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  autor: string;
  midia?: File | string; // File antes do upload, string depois
}

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {
  private apiUrl = 'http://localhost:3000/memorias';

  constructor(private http: HttpClient) {}

  getMemorias(): Observable<Memoria[]> {
    // Retorna array de memórias do backend, midia como string (nome arquivo)
    return this.http.get<Memoria[]>(this.apiUrl);
  }

  createMemoria(memoria: Memoria): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', memoria.titulo);
    formData.append('descricao', memoria.descricao);
    formData.append('data', memoria.data);
    formData.append('autor', memoria.autor);
    if (memoria.midia instanceof File) {
      formData.append('midia', memoria.midia);
    }
    return this.http.post(this.apiUrl, formData);
  }

  getMemoria(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
