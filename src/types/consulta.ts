
export interface ConsultaResult {
  id: string;
  timestamp: Date;
  tipo: string;
  parametro: string;
  resultado: any;
}

export interface DadosPessoais {
  nome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: string;
  sexo?: string;
  situacaoCpf?: string;
}

export interface Email {
  email: string;
  ativo: boolean;
  tipo?: string;
}

export interface Telefone {
  numero: string;
  tipo: string;
  ativo: boolean;
  operadora?: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  tipo?: string;
}

export interface PoderAquisitivo {
  score: number;
  classe: string;
  rendaEstimada?: string;
  patrimonioEstimado?: string;
}

export interface Parentesco {
  nome: string;
  cpf: string;
  grauParentesco: string;
  idade?: number;
}

export interface ConsultaResponse {
  success: boolean;
  data: {
    dadosPessoais?: DadosPessoais;
    emails?: Email[];
    telefones?: Telefone[];
    enderecos?: Endereco[];
    poderAquisitivo?: PoderAquisitivo;
    parentesco?: Parentesco[];
    score?: number;
  };
  message?: string;
}

export interface ConsultaFilter {
  tipo: string;
  campo: string;
  operador: string;
  valor: string;
}

export interface FiltroPersonalizado {
  nome: string;
  filtros: ConsultaFilter[];
  ordenacao?: {
    campo: string;
    direcao: 'asc' | 'desc';
  };
}
