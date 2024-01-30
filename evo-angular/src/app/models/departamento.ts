import { funcionario } from "./funcionario";

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
    funcionarios: funcionario[];
  }