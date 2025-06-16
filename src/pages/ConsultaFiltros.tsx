
import { useState } from 'react';
import { useConsulta } from '@/contexts/ConsultaContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Search, Plus, Trash2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Filtro {
  id: string;
  campo: string;
  operador: string;
  valor: string;
}

const ConsultaFiltros = () => {
  const [filtros, setFiltros] = useState<Filtro[]>([]);
  const [novoFiltro, setNovoFiltro] = useState({ campo: '', operador: '', valor: '' });
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [consultando, setConsultando] = useState(false);
  const { state } = useConsulta();

  const campos = [
    { value: 'nome', label: 'Nome' },
    { value: 'cpf', label: 'CPF' },
    { value: 'email', label: 'Email' },
    { value: 'telefone', label: 'Telefone' },
    { value: 'cidade', label: 'Cidade' },
    { value: 'estado', label: 'Estado' },
    { value: 'score', label: 'Score' },
    { value: 'idade', label: 'Idade' },
    { value: 'renda', label: 'Renda' },
    { value: 'classe', label: 'Classe Social' },
  ];

  const operadores = [
    { value: 'igual', label: 'Igual a' },
    { value: 'diferente', label: 'Diferente de' },
    { value: 'contem', label: 'Contém' },
    { value: 'nao_contem', label: 'Não contém' },
    { value: 'maior', label: 'Maior que' },
    { value: 'menor', label: 'Menor que' },
    { value: 'maior_igual', label: 'Maior ou igual' },
    { value: 'menor_igual', label: 'Menor ou igual' },
  ];

  const adicionarFiltro = () => {
    if (!novoFiltro.campo || !novoFiltro.operador || !novoFiltro.valor) {
      toast({
        title: 'Filtro incompleto',
        description: 'Preencha todos os campos do filtro.',
        variant: 'destructive',
      });
      return;
    }

    const filtro: Filtro = {
      id: Date.now().toString(),
      ...novoFiltro
    };

    setFiltros([...filtros, filtro]);
    setNovoFiltro({ campo: '', operador: '', valor: '' });

    toast({
      title: 'Filtro adicionado',
      description: 'O filtro foi adicionado com sucesso.',
    });
  };

  const removerFiltro = (id: string) => {
    setFiltros(filtros.filter(f => f.id !== id));
  };

  const executarConsulta = async () => {
    if (filtros.length === 0) {
      toast({
        title: 'Nenhum filtro',
        description: 'Adicione pelo menos um filtro para realizar a consulta.',
        variant: 'destructive',
      });
      return;
    }

    setConsultando(true);

    try {
      // Simular consulta com filtros
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular resultados baseados nos filtros
      const resultadosSimulados = Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, i) => ({
        id: i + 1,
        nome: `Pessoa ${i + 1}`,
        cpf: `${Math.floor(Math.random() * 999).toString().padStart(3, '0')}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-${Math.floor(Math.random() * 99).toString().padStart(2, '0')}`,
        email: `pessoa${i + 1}@exemplo.com`,
        telefone: `(11) 9${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
        cidade: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador'][Math.floor(Math.random() * 4)],
        estado: ['SP', 'RJ', 'MG', 'BA'][Math.floor(Math.random() * 4)],
        score: Math.floor(Math.random() * 1000),
        idade: Math.floor(Math.random() * 60) + 18,
        classe: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
      }));

      setResultados(resultadosSimulados);

      toast({
        title: 'Consulta executada',
        description: `${resultadosSimulados.length} registros encontrados.`,
      });

    } catch (error) {
      toast({
        title: 'Erro na consulta',
        description: 'Não foi possível executar a consulta personalizada.',
        variant: 'destructive',
      });
    } finally {
      setConsultando(false);
    }
  };

  const salvarFiltro = () => {
    if (!nomeFiltro || filtros.length === 0) {
      toast({
        title: 'Dados incompletos',
        description: 'Insira um nome e pelo menos um filtro.',
        variant: 'destructive',
      });
      return;
    }

    // Aqui você salvaria o filtro personalizado
    toast({
      title: 'Filtro salvo',
      description: `O filtro "${nomeFiltro}" foi salvo com sucesso.`,
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Filtros Personalizados
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Crie consultas avançadas com filtros específicos
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Construtor de Filtros */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Novo Filtro */}
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Filtro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Campo
                    </Label>
                    <Select 
                      value={novoFiltro.campo} 
                      onValueChange={(value) => setNovoFiltro({ ...novoFiltro, campo: value })}
                    >
                      <SelectTrigger className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <SelectValue placeholder="Selecione um campo" />
                      </SelectTrigger>
                      <SelectContent>
                        {campos.map((campo) => (
                          <SelectItem key={campo.value} value={campo.value}>
                            {campo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Operador
                    </Label>
                    <Select 
                      value={novoFiltro.operador} 
                      onValueChange={(value) => setNovoFiltro({ ...novoFiltro, operador: value })}
                    >
                      <SelectTrigger className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <SelectValue placeholder="Selecione um operador" />
                      </SelectTrigger>
                      <SelectContent>
                        {operadores.map((operador) => (
                          <SelectItem key={operador.value} value={operador.value}>
                            {operador.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Valor
                    </Label>
                    <Input
                      value={novoFiltro.valor}
                      onChange={(e) => setNovoFiltro({ ...novoFiltro, valor: e.target.value })}
                      placeholder="Digite o valor"
                      className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>

                  <Button onClick={adicionarFiltro} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Filtro
                  </Button>
                </CardContent>
              </Card>

              {/* Salvar Filtro */}
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Save className="w-5 h-5 mr-2" />
                    Salvar Filtro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Nome do Filtro
                    </Label>
                    <Input
                      value={nomeFiltro}
                      onChange={(e) => setNomeFiltro(e.target.value)}
                      placeholder="Meu filtro personalizado"
                      className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>

                  <Button onClick={salvarFiltro} variant="outline" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Filtro
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filtros Ativos e Resultados */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Filtros Ativos */}
              {filtros.length > 0 && (
                <Card className={`${
                  state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Filter className="w-5 h-5 mr-2" />
                        Filtros Ativos ({filtros.length})
                      </CardTitle>
                      <Button
                        onClick={executarConsulta}
                        disabled={consultando}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      >
                        {consultando ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Executar Consulta
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filtros.map((filtro) => (
                        <div key={filtro.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                          state.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {campos.find(c => c.value === filtro.campo)?.label}
                            </Badge>
                            <span className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {operadores.find(o => o.value === filtro.operador)?.label}
                            </span>
                            <Badge>
                              {filtro.valor}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => removerFiltro(filtro.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Loading */}
              {consultando && (
                <Card className={`${
                  state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <CardContent className="p-8">
                    <LoadingSpinner size="lg" text="Executando consulta personalizada..." />
                  </CardContent>
                </Card>
              )}

              {/* Resultados */}
              {resultados.length > 0 && !consultando && (
                <Card className={`${
                  state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center ${
                      state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Search className="w-5 h-5 mr-2" />
                      Resultados ({resultados.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Classe</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resultados.slice(0, 10).map((resultado) => (
                            <TableRow key={resultado.id}>
                              <TableCell className="font-medium">{resultado.nome}</TableCell>
                              <TableCell className="font-mono">{resultado.cpf}</TableCell>
                              <TableCell>{resultado.email}</TableCell>
                              <TableCell>{resultado.cidade} - {resultado.estado}</TableCell>
                              <TableCell>
                                <Badge variant={resultado.score >= 700 ? "default" : "secondary"}>
                                  {resultado.score}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {resultado.classe}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {resultados.length > 10 && (
                      <p className={`text-center mt-4 text-sm ${
                        state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Mostrando 10 de {resultados.length} resultados
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaFiltros;
