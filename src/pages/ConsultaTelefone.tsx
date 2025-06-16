
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
import { Phone, Search, MapPin, Mail, User } from 'lucide-react';

const ConsultaTelefone = () => {
  const [telefone, setTelefone] = useState('');
  const [resultado, setResultado] = useState(null);
  const { state } = useConsulta();
  const { consultarTelefone } = useConsultaApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telefone) return;

    try {
      const response = await consultarTelefone.mutateAsync(telefone);
      setResultado(response);
    } catch (error) {
      console.error('Erro na consulta:', error);
    }
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setTelefone(formatted);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Consulta por Telefone
              </h1>
              <p className={`text-lg ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Localize informações através de números de telefone
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
                    <Label htmlFor="telefone" className={`${
                      state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={telefone}
                      onChange={handleTelefoneChange}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      className={`mt-1 ${
                        state.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={!telefone || consultarTelefone.isPending}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  >
                    {consultarTelefone.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Consultar Telefone
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2">
            {consultarTelefone.isPending && (
              <Card className={`${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <LoadingSpinner size="lg" text="Consultando telefone..." />
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
                          <p className={`${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{resultado.data.dadosPessoais.nome}</p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}>CPF</p>
                          <p className={`${
                            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{resultado.data.dadosPessoais.cpf}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Telefones */}
                {resultado.data.telefones && resultado.data.telefones.length > 0 && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Phone className="w-5 h-5 mr-2" />
                        Telefones Associados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Número</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Operadora</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resultado.data.telefones.map((tel, index) => (
                            <TableRow key={index}>
                              <TableCell>{tel.numero}</TableCell>
                              <TableCell>{tel.tipo}</TableCell>
                              <TableCell>
                                <Badge variant={tel.ativo ? "default" : "secondary"}>
                                  {tel.ativo ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </TableCell>
                              <TableCell>{tel.operadora || 'N/A'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Emails */}
                {resultado.data.emails && resultado.data.emails.length > 0 && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Mail className="w-5 h-5 mr-2" />
                        Emails
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tipo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resultado.data.emails.map((email, index) => (
                            <TableRow key={index}>
                              <TableCell>{email.email}</TableCell>
                              <TableCell>
                                <Badge variant={email.ativo ? "default" : "secondary"}>
                                  {email.ativo ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </TableCell>
                              <TableCell>{email.tipo || 'N/A'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Endereços */}
                {resultado.data.enderecos && resultado.data.enderecos.length > 0 && (
                  <Card className={`${
                    state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <MapPin className="w-5 h-5 mr-2" />
                        Endereços
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {resultado.data.enderecos.map((endereco, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            state.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <p className={`font-medium ${
                              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {endereco.logradouro}, {endereco.numero}
                            </p>
                            <p className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {endereco.bairro}, {endereco.cidade} - {endereco.estado}
                            </p>
                            <p className={`text-sm ${
                              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              CEP: {endereco.cep}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaTelefone;
