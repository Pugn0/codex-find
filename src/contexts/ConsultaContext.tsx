
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ConsultaResult } from '@/types/consulta';

interface ConsultaState {
  historico: ConsultaResult[];
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
}

interface ConsultaAction {
  type: 'ADD_CONSULTA' | 'SET_LOADING' | 'SET_ERROR' | 'CLEAR_ERROR' | 'TOGGLE_THEME';
  payload?: any;
}

const initialState: ConsultaState = {
  historico: [],
  loading: false,
  error: null,
  theme: 'light',
};

const consultaReducer = (state: ConsultaState, action: ConsultaAction): ConsultaState => {
  switch (action.type) {
    case 'ADD_CONSULTA':
      return {
        ...state,
        historico: [action.payload, ...state.historico.slice(0, 9)], // Mantém apenas 10 consultas
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

const ConsultaContext = createContext<{
  state: ConsultaState;
  dispatch: React.Dispatch<ConsultaAction>;
} | null>(null);

export const ConsultaProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(consultaReducer, initialState);

  return (
    <ConsultaContext.Provider value={{ state, dispatch }}>
      {children}
    </ConsultaContext.Provider>
  );
};

export const useConsulta = () => {
  const context = useContext(ConsultaContext);
  if (!context) {
    throw new Error('useConsulta must be used within a ConsultaProvider');
  }
  return context;
};
