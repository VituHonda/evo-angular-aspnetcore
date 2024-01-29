import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { departamentoInterface } from '../interfaces/departamentoInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  url = "http://localhost:5280/departamento";

  constructor(private http: HttpClient) { }

  // READ
  getAllDept(): Observable<departamentoInterface[]>{
    return this.http.get<departamentoInterface[]>(this.url)
  }

  // READ BY ID
  getDeptById(id: number): Observable<departamentoInterface>{
    return this.http.get<departamentoInterface>(`${this.url}/${id}`)
  }

  // CREATE
  postDept(departamento: departamentoInterface) {
    return this.http.post(this.url, departamento)
  }

  // UPDATE
  putDept(id: number, departamento: departamentoInterface) {
    return this.http.put(`${this.url}/${id}`, departamento)
  }

  // DELETE
  deleteDept(id: number) {
    return this.http.delete<departamentoInterface>(`${this.url}/${id}`)
  }

}
