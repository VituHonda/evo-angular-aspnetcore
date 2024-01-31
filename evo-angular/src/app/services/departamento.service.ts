import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { departamento } from '../models/departamento';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  url = "http://localhost:5280/departamento";

  constructor(private http: HttpClient) { }

  // READ
  getAllDept(): Observable<departamento[]>{
    return this.http.get<departamento[]>(this.url)
  }

  // READ BY ID
  getDeptById(id: number): Observable<departamento>{
    return this.http.get<departamento>(`${this.url}/${id}`)
  }

  // CREATE
  postDept(departamento: departamento) {
    return this.http.post(this.url, departamento)
  }

  // UPDATE
  putDept(departamento: departamento) {
    return this.http.put(`${this.url}/${departamento.id}`, departamento)
  }

  // DELETE
  deleteDept(id: number) {
    return this.http.delete<departamento>(`${this.url}/${id}`)
  }

}
