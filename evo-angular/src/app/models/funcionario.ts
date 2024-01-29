import { departamentoInterface } from "../interfaces/departamentoInterface";

export class funcionario {

    constructor() {

        this.id = 0;
        this.nome = '';
        this.foto = '';
        this.rg = '';
        this.departamento = null; 
        this.departamentoId = 0
        
    }

    id: number;
    nome: string;
    foto: string;
    rg: string;
    departamento: departamentoInterface | null;
    departamentoId: number;
  }