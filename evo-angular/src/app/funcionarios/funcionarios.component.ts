import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { funcionarioInterface } from '../interfaces/funcionarioInterface';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {

  public funcionarios: funcionarioInterface[] = []
  public errorMessage!: string;

  constructor(private data_service: FuncionarioService) {}

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

}