
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useConsulta } from '@/contexts/ConsultaContext';
import { ConsultaResponse } from '@/types/consulta';
import { Search, Download, Filter } from 'lucide-react';

interface ResultsTableProps {
  data: ConsultaResponse;
  onExport?: () => void;
}

export const ResultsTable = ({ data, onExport }: ResultsTableProps) => {
  const { state } = useConsulta();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dados-pessoais');

  const tabs = [
    { id: 'dados-pessoais', label: 'Dados Pessoais', data: data.data.dadosPessoais },
    { id: 'emails', label: 'Emails', data: data.data.emails },
    { id: 'telefones', label: 'Telefones', data: data.data.telefones },
    { id: 'enderecos', label: 'Endereços', data: data.data.enderecos },
    { id: 'parentesco', label: 'Parentesco', data: data.data.parentesco },
    { id: 'poder-aquisitivo', label: 'Poder Aquisitivo', data: data.data.poderAquisitivo },
  ].filter(tab => tab.data);

  const renderDadosPessoais = (dados: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(dados).map(([key, value]) => (
        <div key={key} className={`p-4 rounded-lg border ${
          state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <dt className={`text-sm font-medium ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </dt>
          <dd className={`mt-1 text-sm ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {value as string}
          </dd>
        </div>
      ))}
    </div>
  );

  const renderTable = (items: any[], columns: string[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>
              {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column}>
                {typeof item[column] === 'boolean' ? (
                  <Badge variant={item[column] ? 'default' : 'secondary'}>
                    {item[column] ? 'Ativo' : 'Inativo'}
                  </Badge>
                ) : (
                  item[column]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className={`rounded-lg border ${
      state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className={`text-lg font-semibold ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Resultados da Consulta
          </h3>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar nos resultados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'dados-pessoais' && data.data.dadosPessoais && 
          renderDadosPessoais(data.data.dadosPessoais)
        }
        
        {activeTab === 'emails' && data.data.emails && 
          renderTable(data.data.emails, ['email', 'tipo', 'ativo'])
        }
        
        {activeTab === 'telefones' && data.data.telefones && 
          renderTable(data.data.telefones, ['numero', 'tipo', 'operadora', 'ativo'])
        }
        
        {activeTab === 'enderecos' && data.data.enderecos && 
          renderTable(data.data.enderecos, ['logradouro', 'numero', 'bairro', 'cidade', 'estado', 'cep', 'tipo'])
        }
        
        {activeTab === 'parentesco' && data.data.parentesco && 
          renderTable(data.data.parentesco, ['nome', 'cpf', 'grauParentesco', 'idade'])
        }
        
        {activeTab === 'poder-aquisitivo' && data.data.poderAquisitivo && 
          renderDadosPessoais(data.data.poderAquisitivo)
        }
      </div>
    </div>
  );
};
