import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../services/funcionario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { funcionario } from '../models/funcionario';
import { DepartamentoService } from '../services/departamento.service';
import { departamento } from '../models/departamento';


@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {

  public modalRef!: BsModalRef;

  public funcionarioForm!: FormGroup;

  public funcionarios: funcionario[] = []
  public novoFuncionario!: funcionario;

  public errorMessage!: string;
  public indice: number = 4;

  public funcionarioSelecionado!: funcionario;

  public departamentos: departamento[] = [];

  constructor(private data_service2: FuncionarioService,
    private data_service: DepartamentoService,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.createFormFunc();
  }

  ngOnInit() {
    this.data_service2.getAllFunc().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    this.data_service.getAllDept().subscribe({
      next: (departamento) => {
        this.departamentos = departamento;
      },
      error: (error) => {
        this.errorMessage = error;
      },
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

  cadastrarFuncionario() {
    this.indice = 5;
    this.funcionarioForm.reset();
    this.funcionarioSelecionado = new funcionario();
  }

  salvarCadastroFunc(funcionario: funcionario) {
    console.log(this.funcionarioForm.value);
    funcionario = this.funcionarioForm.value;
    this.data_service2.postFunc(funcionario).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (error: any) => {
        console.error(error);
      }
    )
    this.indice = 4
  }

  editarFuncionario(funcionario: funcionario) {
    this.indice = 6;
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  salvarEdicao(funcionario: funcionario) {
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

    this.indice = 4
  }

  openModal(template: TemplateRef<any>, funcionario: funcionario) {

    this.modalRef = this.modalService.show(template);
    this.funcionarioSelecionado = funcionario;
    this.indice = 4;
  }

  excluirFuncionario(funcionario: funcionario) {
    this.indice = 4
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

  fecharModal() {
    this.indice = 4
    this.modalService.hide();
  }

  voltar() {
    this.indice = 4
    this.funcionarioSelecionado = this.novoFuncionario;
  }

  carregarFuncionario() {

    this.data_service2.getAllFunc().subscribe({
      next: (funcionario) => {
        this.funcionarios = funcionario;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}