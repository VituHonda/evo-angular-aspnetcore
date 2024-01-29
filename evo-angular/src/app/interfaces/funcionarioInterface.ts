import { departamentoInterface } from "./departamentoInterface"

export interface funcionarioInterface {
    id: number,
    nome: string,
    foto: string,
    rg: string,
    departamento: departamentoInterface;
    departamentoId: number
  }