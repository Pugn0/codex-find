
import { useState } from 'react';
import { useConsulta } from '@/contexts/ConsultaContext';
import { useConsultaApi } from '@/hooks/useConsultaApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Search, User, DollarSign, CreditCard, Target } from 'lucide-react';

const ConsultaPoderAquisitivo = () => {
  const [cpf, setCpf] = useState('');
  const [resultado, setResultado] = useState(null);
  const { state } = useConsulta();
  const { consultarCpf } = useConsultaApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf) return;

    try {
      const response = await consultarCpf.mutateAsync(cpf);
      setResultado(response);
    } catch (error) {
      console.error('Erro na consulta:', error);
    }
  };

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setCpf(formatted);
  };

  const isValidCpf = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 600) return 'text-yellow-600';
    if (score >= 400) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreProgress = (score: number) => {
    return (score / 1000) * 100;
  };

  const getClasseColor = (classe: string) => {
    switch (classe.toUpperCase()) {
      case 'A': return 'bg-green-100 text-green-800 border-green-300';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'E': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Consulta de Poder Aquisitivo
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Analise o perfil socioeconômico e capacidade financeira
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-1">
            <Card className={`${
              state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <Search className="w-5 h-5 mr-2" />
                  Nova Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="cpf" className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      type="text"
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="123.456.789-00"
                      maxLength={14}
                      className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    {cpf && !isValidCpf(cpf) && (
                      <p className="text-red-500 text-sm mt-1">
                        Por favor, insira um CPF válido (11 dígitos)
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={!cpf || !isValidCpf(cpf) || consultarCpf.isPending}
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  >
                    {consultarCpf.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Analisar Poder Aquisitivo
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2">
            {consultarCpf.isPending && (
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <LoadingSpinner size="lg" text="Analisando poder aquisitivo..." />
                </CardContent>
              </Card>
            )}

            {resultado && (
              <div className="space-y-6">
                {/* Dados Pessoais */}
                {resultado.data.dadosPessoais && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <User className="w-5 h-5 mr-2" />
                        Dados Pessoais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm font-medium ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}>Nome</p>
                          <p className={`text-lg font-semibold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{resultado.data.dadosPessoais.nome}</p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}>CPF</p>
                          <p className={`text-lg font-semibold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{resultado.data.dadosPessoais.cpf}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Score Geral */}
                {resultado.data.score && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Target className="w-5 h-5 mr-2" />
                        Score Geral
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-6xl font-bold mb-4 ${getScoreColor(resultado.data.score)}`}>
                          {resultado.data.score}
                        </div>
                        <Progress 
                          value={getScoreProgress(resultado.data.score)} 
                          className="w-full h-3 mb-4"
                        />
                        <p className={`text-sm ${
                          state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          Score de 0 a 1000 pontos
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Poder Aquisitivo Detalhado */}
                {resultado.data.poderAquisitivo && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Análise de Poder Aquisitivo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className={`text-sm font-medium ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`}>Score</p>
                            <div className="flex items-center space-x-2">
                              <span className={`text-3xl font-bold ${getScoreColor(resultado.data.poderAquisitivo.score)}`}>
                                {resultado.data.poderAquisitivo.score}
                              </span>
                              <Target className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <p className={`text-sm font-medium ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`}>Classe Social</p>
                            <Badge 
                              className={`text-lg px-3 py-1 ${getClasseColor(resultado.data.poderAquisitivo.classe)}`}
                            >
                              Classe {resultado.data.poderAquisitivo.classe}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {resultado.data.poderAquisitivo.rendaEstimada && (
                            <div>
                              <p className={`text-sm font-medium ${
                                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>Renda Estimada</p>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                <span className={`text-lg font-semibold ${
                                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {resultado.data.poderAquisitivo.rendaEstimada}
                                </span>
                              </div>
                            </div>
                          )}

                          {resultado.data.poderAquisitivo.patrimonioEstimado && (
                            <div>
                              <p className={`text-sm font-medium ${
                                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>Patrimônio Estimado</p>
                              <div className="flex items-center space-x-2">
                                <CreditCard className="w-5 h-5 text-blue-500" />
                                <span className={`text-lg font-semibold ${
                                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {resultado.data.poderAquisitivo.patrimonioEstimado}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Métricas Resumidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white mr-4">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {resultado.data.poderAquisitivo?.classe || 'N/A'}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Classe Social
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {resultado.data.score || resultado.data.poderAquisitivo?.score}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Score Geral
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white mr-4">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {resultado.data.poderAquisitivo?.score >= 700 ? 'Alto' : 
                             resultado.data.poderAquisitivo?.score >= 500 ? 'Médio' : 'Baixo'}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Poder Aquisitivo
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaPoderAquisitivo;
