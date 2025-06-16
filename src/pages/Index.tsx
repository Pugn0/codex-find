
import { useConsulta } from '@/contexts/ConsultaContext';
import { ConsultaCard } from '@/components/ConsultaCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  TrendingUp, 
  Filter,
  FileText,
  Clock,
  BarChart3
} from 'lucide-react';

const Index = () => {
  const { state } = useConsulta();

  const consultaTypes = [
    {
      title: 'Consulta por CPF',
      description: 'Busque informações completas de uma pessoa através do CPF',
      icon: <Search className="w-6 h-6" />,
      href: '/consulta/cpf',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Consulta por Email',
      description: 'Encontre dados associados a um endereço de email',
      icon: <Mail className="w-6 h-6" />,
      href: '/consulta/email',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Consulta por Telefone',
      description: 'Localize informações através de números de telefone',
      icon: <Phone className="w-6 h-6" />,
      href: '/consulta/telefone',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Consulta por Endereço',
      description: 'Busque dados através de CEP ou endereço completo',
      icon: <MapPin className="w-6 h-6" />,
      href: '/consulta/endereco',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Consulta de Parentesco',
      description: 'Descubra vínculos familiares e relacionamentos',
      icon: <Users className="w-6 h-6" />,
      href: '/consulta/parentesco',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Poder Aquisitivo',
      description: 'Analise o perfil socioeconômico e capacidade financeira',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/consulta/poder-aquisitivo',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Consulta em Massa',
      description: 'Realize múltiplas consultas através de upload de arquivo',
      icon: <FileText className="w-6 h-6" />,
      href: '/consulta/massa',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Filtros Personalizados',
      description: 'Crie consultas avançadas com filtros específicos',
      icon: <Filter className="w-6 h-6" />,
      href: '/consulta/filtros',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Query Navigator Pro
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sistema avançado de consultas com múltiplas fontes de dados. 
            Realize buscas precisas e obtenha informações detalhadas com nossa plataforma integrada.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className={`${
            state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {state.historico.length}
                  </p>
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Consultas Realizadas
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
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    8
                  </p>
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Tipos de Consulta
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
                  <p className={`text-2xl font-bold ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    99.9%
                  </p>
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Precisão dos Dados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultation Cards */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-8 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Tipos de Consulta Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {consultaTypes.map((consulta, index) => (
              <ConsultaCard
                key={index}
                title={consulta.title}
                description={consulta.description}
                icon={consulta.icon}
                href={consulta.href}
                gradient={consulta.gradient}
              />
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {state.historico.length > 0 && (
          <Card className={`${
            state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Clock className="w-5 h-5 mr-2" />
                Consultas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.historico.slice(0, 5).map((consulta) => (
                  <div key={consulta.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    state.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">
                        {consulta.tipo}
                      </Badge>
                      <span className={`font-medium ${
                        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {consulta.parametro}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {formatDate(consulta.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
