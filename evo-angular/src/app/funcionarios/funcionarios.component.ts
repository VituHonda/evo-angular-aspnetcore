import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../services/funcionario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { funcionario } from '../models/funcionario';

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
  public indice: number = 0;

  public funcionarioSelecionado!: funcionario;

  constructor(private data_service: FuncionarioService,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.createFormFunc();
  }

  ngOnInit() {
    this.data_service.getAllFunc().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
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
    this.indice = 2;
    this.funcionarioSelecionado = new funcionario();
  }

  salvarCadastroFunc(funcionario: funcionario) {
    console.log(this.funcionarioForm.value);
    funcionario = this.funcionarioForm.value;
    this.data_service.postFunc(funcionario).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (error: any) => {
        console.error(error);
      }
    )
    this.indice = 0
  }

  editarFuncionario(funcionario: funcionario) {
    this.indice = 3;
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  salvarEdicao(funcionario: funcionario) {
    var saveId = funcionario.id;
    funcionario = this.funcionarioForm.value;
    funcionario.id = saveId;

    this.data_service.putFunc(funcionario).subscribe(
      () => {
        this.carregarFuncionario();
      },
      (error: any) => {
        console.error(error);
      }
    )

    this.indice = 0
  }

  openModal(template: TemplateRef<any>, funcionario: funcionario) {

    this.modalRef = this.modalService.show(template);
    this.funcionarioSelecionado = funcionario;
    this.indice = 0;
  }

  excluirFuncionario(funcionario: funcionario) {
    this.indice = 0
    this.modalService.hide();
    this.data_service.deleteFunc(funcionario.id).subscribe(
      () => {
        this.carregarFuncionario();
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
    this.funcionarioSelecionado = this.novoFuncionario;
  }

  carregarFuncionario() {

    this.data_service.getAllFunc().subscribe({
      next: (funcionario) => {
        this.funcionarios = funcionario;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}