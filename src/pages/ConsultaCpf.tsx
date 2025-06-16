
import { useState } from 'react';
import { useConsulta } from '@/contexts/ConsultaContext';
import { useConsultaApi } from '@/hooks/useConsultaApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResultsTable } from '@/components/ResultsTable';
import { Search, User, AlertCircle } from 'lucide-react';
import { ConsultaResponse } from '@/types/consulta';

const ConsultaCpf = () => {
  const { state } = useConsulta();
  const { consultarCpf } = useConsultaApi();
  const [cpf, setCpf] = useState('');
  const [resultado, setResultado] = useState<ConsultaResponse | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const validateCpf = (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(10))) return false;
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    if (!cpf.trim()) {
      setErrors(['CPF é obrigatório']);
      return;
    }
    
    if (!validateCpf(cpf)) {
      setErrors(['CPF inválido']);
      return;
    }
    
    try {
      const response = await consultarCpf.mutateAsync(cpf);
      setResultado(response);
    } catch (error) {
      console.error('Erro na consulta:', error);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setCpf(formatted);
    setErrors([]);
  };

  const handleExport = () => {
    if (!resultado) return;
    
    const data = JSON.stringify(resultado, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consulta-cpf-${cpf}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Consulta por CPF
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Busque informações completas através do CPF
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <Card className={`mb-8 ${
          state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Search className="w-5 h-5 mr-2" />
              Buscar por CPF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cpf" className={`${
                  state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  CPF
                </Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                  className={`mt-1 ${errors.length > 0 ? 'border-red-500' : ''}`}
                />
                {errors.length > 0 && (
                  <div className="flex items-center mt-2 text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{errors[0]}</span>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={consultarCpf.isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {consultarCpf.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Consultar CPF
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {consultarCpf.isPending && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Consultando dados..." />
          </div>
        )}

        {/* Results */}
        {resultado && !consultarCpf.isPending && (
          <ResultsTable data={resultado} onExport={handleExport} />
        )}

        {/* Error State */}
        {state.error && (
          <Card className={`border-red-200 ${
            state.theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h3 className={`font-medium ${
                    state.theme === 'dark' ? 'text-red-300' : 'text-red-800'
                  }`}>
                    Erro na Consulta
                  </h3>
                  <p className={`mt-1 ${
                    state.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {state.error}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultaCpf;
