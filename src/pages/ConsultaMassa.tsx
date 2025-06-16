
import { useState, useRef } from 'react';
import { useConsulta } from '@/contexts/ConsultaContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Upload, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ConsultaMassa = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [resultados, setResultados] = useState<any[]>([]);
  const [processando, setProcessando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state } = useConsulta();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setArquivo(file);
        toast({
          title: 'Arquivo selecionado',
          description: `${file.name} foi carregado com sucesso.`,
        });
      } else {
        toast({
          title: 'Formato inválido',
          description: 'Por favor, selecione um arquivo CSV.',
          variant: 'destructive',
        });
      }
    }
  };

  const processarArquivo = async () => {
    if (!arquivo) return;

    setProcessando(true);
    setProgresso(0);

    try {
      // Simular processamento de arquivo CSV
      const csvText = await arquivo.text();
      const linhas = csvText.split('\n').filter(linha => linha.trim());
      const cpfs = linhas.slice(1).map(linha => linha.split(',')[0]?.trim()).filter(cpf => cpf);

      const resultadosTemp: any[] = [];

      for (let i = 0; i < cpfs.length; i++) {
        const cpf = cpfs[i];
        
        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simular resultado da consulta
        const sucesso = Math.random() > 0.2; // 80% de sucesso
        
        const resultado = {
          cpf,
          status: sucesso ? 'sucesso' : 'erro',
          dados: sucesso ? {
            nome: `Pessoa ${i + 1}`,
            emails: [`email${i + 1}@exemplo.com`],
            telefones: [`(11) 9999${i.toString().padStart(4, '0')}`],
            score: Math.floor(Math.random() * 1000)
          } : null,
          erro: sucesso ? null : 'CPF não encontrado'
        };

        resultadosTemp.push(resultado);
        setProgresso(((i + 1) / cpfs.length) * 100);
      }

      setResultados(resultadosTemp);
      
      toast({
        title: 'Processamento concluído',
        description: `${cpfs.length} CPFs foram processados.`,
      });

    } catch (error) {
      toast({
        title: 'Erro no processamento',
        description: 'Não foi possível processar o arquivo.',
        variant: 'destructive',
      });
    } finally {
      setProcessando(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = 'CPF,Nome\n123.456.789-00,Exemplo\n987.654.321-00,Modelo';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_consulta_massa.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadResultados = () => {
    if (resultados.length === 0) return;

    const csvHeader = 'CPF,Status,Nome,Emails,Telefones,Score,Erro\n';
    const csvData = resultados.map(resultado => {
      return [
        resultado.cpf,
        resultado.status,
        resultado.dados?.nome || '',
        resultado.dados?.emails?.join(';') || '',
        resultado.dados?.telefones?.join(';') || '',
        resultado.dados?.score || '',
        resultado.erro || ''
      ].join(',');
    }).join('\n');

    const csvContent = csvHeader + csvData;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_consulta_massa.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sucessos = resultados.filter(r => r.status === 'sucesso').length;
  const erros = resultados.filter(r => r.status === 'erro').length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Consulta em Massa
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Realize múltiplas consultas através de upload de arquivo CSV
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Upload */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Upload de Arquivo */}
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload de Arquivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="arquivo" className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Arquivo CSV
                    </Label>
                    <Input
                      id="arquivo"
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                      className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>

                  {arquivo && (
                    <div className={`p-3 rounded-lg border ${
                      state.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <p className={`text-sm font-medium ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {arquivo.name}
                      </p>
                      <p className={`text-xs ${
                        state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {(arquivo.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={processarArquivo}
                    disabled={!arquivo || processando}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  >
                    {processando ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Processar Arquivo
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Template */}
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Download className="w-5 h-5 mr-2" />
                    Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Baixe o template CSV para formatar seus dados corretamente.
                  </p>
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2">
            {processando && (
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <div className="text-center">
                    <LoadingSpinner size="lg" text="Processando arquivo..." />
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                    <p className={`mt-2 text-sm ${
                      state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {progresso.toFixed(0)}% concluído
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {resultados.length > 0 && !processando && (
              <div className="space-y-6">
                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {resultados.length}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Total Processado
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
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white mr-4">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {sucessos}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Sucessos
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
                          <XCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {erros}
                          </p>
                          <p className={`text-sm ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Erros
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de Resultados */}
                <Card className={`${
                  state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <FileText className="w-5 h-5 mr-2" />
                        Resultados da Consulta
                      </CardTitle>
                      <Button
                        onClick={downloadResultados}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>CPF</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Observação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resultados.map((resultado, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-mono">{resultado.cpf}</TableCell>
                              <TableCell>
                                <Badge variant={resultado.status === 'sucesso' ? 'default' : 'destructive'}>
                                  {resultado.status === 'sucesso' ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                  ) : (
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                  )}
                                  {resultado.status === 'sucesso' ? 'Sucesso' : 'Erro'}
                                </Badge>
                              </TableCell>
                              <TableCell>{resultado.dados?.nome || '-'}</TableCell>
                              <TableCell>{resultado.dados?.score || '-'}</TableCell>
                              <TableCell className="text-sm text-red-600">
                                {resultado.erro || 'Dados encontrados'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaMassa;
