
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConsultaResponse, FiltroPersonalizado } from '@/types/consulta';
import { useConsulta } from '@/contexts/ConsultaContext';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = 'https://api.example.com'; // Substitua pela URL real da API

// Simulação de API para desenvolvimento
const mockApiCall = async (endpoint: string, data?: any): Promise<ConsultaResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
  
  return {
    success: true,
    data: {
      dadosPessoais: {
        nome: 'João Silva Santos',
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        dataNascimento: '1985-03-15',
        sexo: 'M',
        situacaoCpf: 'Regular'
      },
      emails: [
        { email: 'joao.silva@email.com', ativo: true, tipo: 'Pessoal' },
        { email: 'j.santos@empresa.com', ativo: true, tipo: 'Profissional' }
      ],
      telefones: [
        { numero: '(11) 99999-9999', tipo: 'Celular', ativo: true, operadora: 'Vivo' },
        { numero: '(11) 3333-3333', tipo: 'Residencial', ativo: false, operadora: 'Telefonica' }
      ],
      enderecos: [
        {
          logradouro: 'Rua das Flores',
          numero: '123',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
          tipo: 'Residencial'
        }
      ],
      poderAquisitivo: {
        score: 750,
        classe: 'B',
        rendaEstimada: 'R$ 5.000 - R$ 10.000',
        patrimonioEstimado: 'R$ 100.000 - R$ 500.000'
      },
      parentesco: [
        { nome: 'Maria Silva Santos', cpf: '987.654.321-00', grauParentesco: 'Cônjuge', idade: 42 },
        { nome: 'Pedro Silva Santos', cpf: '456.789.123-00', grauParentesco: 'Filho', idade: 18 }
      ],
      score: 750
    }
  };
};

export const useConsultaApi = () => {
  const { dispatch } = useConsulta();
  const queryClient = useQueryClient();

  const consultarCpf = useMutation({
    mutationFn: async (cpf: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return mockApiCall(`/consulta/cpf/${cpf}`);
    },
    onSuccess: (data, variables) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({
        type: 'ADD_CONSULTA',
        payload: {
          id: Date.now().toString(),
          timestamp: new Date(),
          tipo: 'CPF',
          parametro: variables,
          resultado: data
        }
      });
      toast({
        title: 'Consulta realizada com sucesso!',
        description: 'Os dados foram carregados.',
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao consultar CPF' });
      toast({
        title: 'Erro na consulta',
        description: 'Não foi possível realizar a consulta.',
        variant: 'destructive',
      });
    }
  });

  const consultarEmail = useMutation({
    mutationFn: async (email: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return mockApiCall(`/consulta/email/${email}`);
    },
    onSuccess: (data, variables) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({
        type: 'ADD_CONSULTA',
        payload: {
          id: Date.now().toString(),
          timestamp: new Date(),
          tipo: 'Email',
          parametro: variables,
          resultado: data
        }
      });
      toast({
        title: 'Consulta realizada com sucesso!',
        description: 'Os dados foram carregados.',
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao consultar email' });
      toast({
        title: 'Erro na consulta',
        description: 'Não foi possível realizar a consulta.',
        variant: 'destructive',
      });
    }
  });

  const consultarTelefone = useMutation({
    mutationFn: async (telefone: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return mockApiCall(`/consulta/telefone/${telefone}`);
    },
    onSuccess: (data, variables) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({
        type: 'ADD_CONSULTA',
        payload: {
          id: Date.now().toString(),
          timestamp: new Date(),
          tipo: 'Telefone',
          parametro: variables,
          resultado: data
        }
      });
      toast({
        title: 'Consulta realizada com sucesso!',
        description: 'Os dados foram carregados.',
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao consultar telefone' });
      toast({
        title: 'Erro na consulta',
        description: 'Não foi possível realizar a consulta.',
        variant: 'destructive',
      });
    }
  });

  const consultarCep = useMutation({
    mutationFn: async (cep: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return mockApiCall(`/consulta/endereco/${cep}`);
    },
    onSuccess: (data, variables) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({
        type: 'ADD_CONSULTA',
        payload: {
          id: Date.now().toString(),
          timestamp: new Date(),
          tipo: 'CEP',
          parametro: variables,
          resultado: data
        }
      });
      toast({
        title: 'Consulta realizada com sucesso!',
        description: 'Os dados foram carregados.',
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao consultar CEP' });
      toast({
        title: 'Erro na consulta',
        description: 'Não foi possível realizar a consulta.',
        variant: 'destructive',
      });
    }
  });

  return {
    consultarCpf,
    consultarEmail,
    consultarTelefone,
    consultarCep,
  };
};
