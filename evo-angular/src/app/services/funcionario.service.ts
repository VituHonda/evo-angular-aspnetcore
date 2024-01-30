import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { funcionario } from '../models/funcionario';

@Injectable({providedIn: 'root'})

export class FuncionarioService {

  url = "http://localhost:5280/funcionario";

  constructor(private http: HttpClient) { }

  // READ
  getAllFunc(): Observable<funcionario[]> {
    return this.http.get<funcionario[]>(this.url)
  }

  // READ BY ID
  getFuncById(id: number): Observable<funcionario> {
    return this.http.get<funcionario>(`${this.url}/${id}`)
  }

  // READ BY DEPT
  getFuncByDeptId(id: number): Observable<funcionario[]> {
    return this.http.get<funcionario[]>(`${this.url}/ByDepartment/${id}`)
  }

  // CREATE
  postFunc(funcionario: funcionario) {
    return this.http.post(this.url, funcionario)
  }

  // UPDATE
  putFunc(funcionario: funcionario) {
    return this.http.put(`${this.url}/${funcionario.id}`, funcionario)
  }

  // DELETE
  deleteFunc(id: number) {
    return this.http.delete<funcionario>(`${this.url}/${id}`)
  }

}
