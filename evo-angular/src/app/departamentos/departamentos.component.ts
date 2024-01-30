import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../services/departamento.service';
import { departamentoInterface } from '../interfaces/departamentoInterface';
import { funcionarioInterface } from '../interfaces/funcionarioInterface';
import { FuncionarioService } from '../services/funcionario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { departamento } from '../models/departamento'

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})

export class DepartamentosComponent {

  public modalRef!: BsModalRef;

  public departamentoForm!: FormGroup;

  public errorMessage!: string;
  public indice: number = 0;

  public departamentos: departamentoInterface[] = [];
  public novoDepartamento!: departamentoInterface
  public departamentoSelecionado!: departamentoInterface;

  public funcionarios: funcionarioInterface[] = [];



  constructor(private data_service: DepartamentoService,
    private data_service2: FuncionarioService,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.createFormDept();
  }

  ngOnInit() {
    this.data_service.getAllDept().subscribe({
      next: (departamento) => {
        this.departamentos = departamento;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  createFormDept() {
    this.departamentoForm = this.fb.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    });
  }

  selecionaDepartamento(departamento: departamentoInterface) {
    this.indice = 1;
    this.departamentoSelecionado = departamento;

    // this.data_service2.getFuncByDeptId(this.departamentoSelecionado.id).subscribe({
    //   next: (funcionario) => {
    //     this.funcionarios = funcionario;
    //   },
    //   error: (error) => {
    //     this.errorMessage = error;
    //   },
    // });
  }

  cadastrarDepartamento() {
    this.indice = 2;
    this.departamentoSelecionado = new departamento();
  }

  salvarCadastro(departamento: departamentoInterface) {
    console.log(this.departamentoForm.value);
    departamento = this.departamentoForm.value;
    this.data_service.postDept(departamento).subscribe(
      () => {
        this.carregarDepartamentos();
      },
      (error: any) => {
        console.error(error);
      }
    )

    this.indice = 0
  }

  editarDepartamento(departamento: departamentoInterface) {
    this.indice = 3;
    this.departamentoSelecionado = departamento;
    this.departamentoForm.patchValue(departamento);
  }

  salvarEdicao(departamento: departamentoInterface) {
    var saveId = departamento.id;
    departamento = this.departamentoForm.value;
    departamento.id = saveId;

    this.data_service.putDept(departamento).subscribe(
      () => {
        this.carregarDepartamentos();
      },
      (error: any) => {
        console.error(error);
      }
    )

    this.indice = 0
  }

  openModal(template: TemplateRef<any>, departamento: departamentoInterface) {

    this.modalRef = this.modalService.show(template);
    this.departamentoSelecionado = departamento;
    this.indice = 0;
  }

  excluirDepartamento(departamento: departamentoInterface) {
    this.indice = 0
    this.modalService.hide();
    this.data_service.deleteDept(departamento.id).subscribe(
      () => {
        this.carregarDepartamentos();
      },
      (erro: any) => {
        console.log(erro);
      }
    )
  }

  fecharModal() {
    this.indice = 0
    this.modalService.hide();
  }

  voltar() {
    this.indice = 0
    this.departamentoSelecionado = this.novoDepartamento;
  }

  carregarDepartamentos() {

    this.data_service.getAllDept().subscribe({
      next: (departamento) => {
        this.departamentos = departamento;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}




