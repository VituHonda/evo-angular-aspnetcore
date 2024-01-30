import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../services/departamento.service';
import { FuncionarioService } from '../services/funcionario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { departamento } from '../models/departamento'
import { funcionario } from '../models/funcionario';
import { FuncionariosComponent } from '../funcionarios/funcionarios.component';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FuncionariosComponent],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})

export class DepartamentosComponent {

  public modalRef!: BsModalRef;
  public errorMessage!: string;
  public indice: number = 0;

  public departamentoForm!: FormGroup;
  public departamentos: departamento[] = [];
  public departamentoSelecionado: departamento = new departamento;
  public novoDepartamento: departamento = new departamento

  public funcionarioForm!: FormGroup;
  public funcionarios: funcionario[] = [];
  public funcionarioSelecionado: funcionario = new funcionario;

  constructor(private data_service: DepartamentoService,
    private data_service2: FuncionarioService,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.createFormDept();
    this.createFormFunc();
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

  createFormFunc() {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      foto: [''],
      rg: ['', Validators.required],
      departamentoId: ['', Validators.required]
    });
  }

  detalhesDepartamento(departamento: departamento) {
    this.indice = 1;
    this.departamentoSelecionado = departamento;
    this.data_service2.getFuncByDeptId(this.departamentoSelecionado.id).subscribe({
      next: (funcionario) => {
        this.funcionarios = funcionario;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  cadastrarDepartamento() {
    this.indice = 2;
    this.departamentoForm.reset();
    this.departamentoSelecionado = this.novoDepartamento;
  }

  salvarCadastro(departamento: departamento) {
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

  editarDepartamento(departamento: departamento) {
    this.indice = 3;
    this.departamentoSelecionado = departamento;
    this.departamentoForm.patchValue(departamento);
  }

  salvarEdicao(departamento: departamento) {
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

  openModal(template: TemplateRef<any>, departamento: departamento) {
    this.modalRef = this.modalService.show(template);
    this.departamentoSelecionado = departamento;
    this.indice = 0;
  }

  excluirDepartamento(departamento: departamento) {
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

  // FUNCIONARIO

  openModalFunc(template: TemplateRef<any>, funcionario: funcionario) {
    this.modalRef = this.modalService.show(template);
    this.funcionarioSelecionado = funcionario;
  }

  fecharModalFunc() {
    this.indice = 1
    this.modalService.hide();
  }

  excluirFuncionario(funcionario: funcionario) {
    this.indice = 1
    this.modalService.hide();

    this.data_service2.deleteFunc(funcionario.id).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (erro: any) => {
        console.log(erro);
      }
    )
  }

  cadastrarFuncionario() {
    this.indice = 5;
    this.funcionarioForm.reset();
    this.funcionarioSelecionado = new funcionario();
  }

  salvarCadastroFunc(funcionario: funcionario) {
    funcionario = this.funcionarioForm.value;
    funcionario.departamentoId = this.departamentoSelecionado.id;

    this.data_service2.postFunc(funcionario).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (error: any) => {
        console.error(error);
      }
    )
    this.indice = 1
  }

  editarFuncionario(funcionario: funcionario) {
    this.indice = 6;
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  salvarEdicaoFunc(funcionario: funcionario) {
    var saveId = funcionario.id;
    funcionario = this.funcionarioForm.value;
    funcionario.id = saveId;

    this.data_service2.putFunc(funcionario).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (error: any) => {
        console.error(error);
      }
    )

    this.indice = 1
  }

  selecionaFuncionario(funcionario: funcionario) {
    this.funcionarioSelecionado = funcionario;
  }


  voltar2() {
    this.indice = 1
  }

  carregarFuncionario() {
    this.data_service2.getFuncByDeptId(this.departamentoSelecionado.id).subscribe({
      next: (funcionario) => {
        this.funcionarios = funcionario;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }


}




