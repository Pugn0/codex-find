
import { useState } from 'react';
import { useConsulta } from '@/contexts/ConsultaContext';
import { useConsultaApi } from '@/hooks/useConsultaApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, User, Heart } from 'lucide-react';

const ConsultaParentesco = () => {
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

  const getParentescoIcon = (grau: string) => {
    const grauLower = grau.toLowerCase();
    if (grauLower.includes('cônjuge') || grauLower.includes('esposa') || grauLower.includes('marido')) {
      return <Heart className="w-4 h-4 text-red-500" />;
    }
    return <User className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Consulta de Parentesco
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Descubra vínculos familiares e relacionamentos
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
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                  >
                    {consultarCpf.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Consultar Parentesco
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
                  <LoadingSpinner size="lg" text="Consultando vínculos familiares..." />
                </CardContent>
              </Card>
            )}

            {resultado && (
              <div className="space-y-6">
                {/* Dados da Pessoa Principal */}
                {resultado.data.dadosPessoais && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <User className="w-5 h-5 mr-2" />
                        Pessoa Principal
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
                        {resultado.data.dadosPessoais.dataNascimento && (
                          <div>
                            <p className={`text-sm font-medium ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`}>Data de Nascimento</p>
                            <p className={`${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{new Date(resultado.data.dadosPessoais.dataNascimento).toLocaleDateString('pt-BR')}</p>
                          </div>
                        )}
                        {resultado.data.dadosPessoais.sexo && (
                          <div>
                            <p className={`text-sm font-medium ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`}>Sexo</p>
                            <p className={`${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{resultado.data.dadosPessoais.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Vínculos Familiares */}
                {resultado.data.parentesco && resultado.data.parentesco.length > 0 && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Users className="w-5 h-5 mr-2" />
                        Vínculos Familiares ({resultado.data.parentesco.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Grau de Parentesco</TableHead>
                            <TableHead>Idade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resultado.data.parentesco.map((parente, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getParentescoIcon(parente.grauParentesco)}
                                  <span className="font-medium">{parente.nome}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono">{parente.cpf}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    parente.grauParentesco.toLowerCase().includes('cônjuge') 
                                      ? 'border-red-300 text-red-700' 
                                      : 'border-blue-300 text-blue-700'
                                  }`}
                                >
                                  {parente.grauParentesco}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {parente.idade ? `${parente.idade} anos` : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Estatísticas da Família */}
                {resultado.data.parentesco && resultado.data.parentesco.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={`${
                      state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white mr-4">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <p className={`text-2xl font-bold ${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {resultado.data.parentesco.length}
                            </p>
                            <p className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Vínculos Encontrados
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
                          <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white mr-4">
                            <Heart className="w-6 h-6" />
                          </div>
                          <div>
                            <p className={`text-2xl font-bold ${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {resultado.data.parentesco.filter(p => 
                                p.grauParentesco.toLowerCase().includes('cônjuge') ||
                                p.grauParentesco.toLowerCase().includes('esposa') ||
                                p.grauParentesco.toLowerCase().includes('marido')
                              ).length}
                            </p>
                            <p className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Cônjuges
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
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <p className={`text-2xl font-bold ${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {resultado.data.parentesco.filter(p => 
                                p.grauParentesco.toLowerCase().includes('filho') ||
                                p.grauParentesco.toLowerCase().includes('filha')
                              ).length}
                            </p>
                            <p className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Filhos
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaParentesco;
