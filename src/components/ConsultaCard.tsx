
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useConsulta } from '@/contexts/ConsultaContext';
import { Link } from 'react-router-dom';

interface ConsultaCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient: string;
}

export const ConsultaCard = ({ title, description, icon, href, gradient }: ConsultaCardProps) => {
  const { state } = useConsulta();

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      state.theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
            {icon}
          </div>
          <div>
            <CardTitle className={`text-lg ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <p className={`text-sm mb-6 ${
          state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>
        
        <Link to={href}>
          <Button className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity`}>
            Iniciar Consulta
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
