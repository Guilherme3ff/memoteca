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

  // LISTAR todas as memórias
  getMemorias(): Observable<Memoria[]> {
    return this.http.get<Memoria[]>(this.apiUrl);
  }

  // CRIAR nova memória
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

  // BUSCAR uma memória específica
  getMemoria(id: number): Observable<Memoria> {
    return this.http.get<Memoria>(`${this.apiUrl}/${id}`);
  }

  // ATUALIZAR memória existente
  updateMemoria(id: number, memoria: Memoria): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', memoria.titulo);
    formData.append('descricao', memoria.descricao);
    formData.append('data', memoria.data);
    formData.append('autor', memoria.autor);

    if (memoria.midia instanceof File) {
      formData.append('midia', memoria.midia);
    } else if (typeof memoria.midia === 'string') {
      formData.append('midiaAntiga', memoria.midia); // Para manter a mídia antiga se não for alterada
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // DELETAR memória
  deleteMemoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
