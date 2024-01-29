import { funcionarioInterface } from "./funcionarioInterface";

export interface departamentoInterface {
    id: number,
    nome: string,
    sigla: string,
    funcionarios: funcionarioInterface[];
  }