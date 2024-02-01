import { departamento } from "./departamento";

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
    departamento: departamento | null;
    departamentoId: number | null;
  }