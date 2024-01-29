import { funcionarioInterface } from "../interfaces/funcionarioInterface";

export class departamento {

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sigla = '';
        this.funcionarios = [];
    }

    id: number;
    nome: string;
    sigla: string;
    funcionarios: funcionarioInterface[];
  }