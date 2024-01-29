import { Injectable } from '@angular/core';
import { funcionarioInterface } from '../interfaces/funcionarioInterface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class FuncionarioService {

  url = "http://localhost:5280/funcionario";

  constructor(private http: HttpClient) { }

  // READ
  getAllFunc(): Observable<funcionarioInterface[]> {
    return this.http.get<funcionarioInterface[]>(this.url)
  }

  // READ BY ID
  getFuncById(id: number): Observable<funcionarioInterface> {
    return this.http.get<funcionarioInterface>(`${this.url}/${id}`)
  }

  // READ BY DEPT
  getFuncByDeptId(id: number): Observable<funcionarioInterface> {
    return this.http.get<funcionarioInterface>(`${this.url}/ByDepartment/${id}`)
  }

  // CREATE
  postDept(departamento: funcionarioInterface) {
    return this.http.post(this.url, departamento)
  }

  // UPDATE
  putDept(id: number, departamento: funcionarioInterface) {
    return this.http.put(`${this.url}/${id}`, departamento)
  }

  // DELETE
  deleteDept(id: number) {
    return this.http.delete<funcionarioInterface>(`${this.url}/${id}`)
  }

}
