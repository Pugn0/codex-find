
import { useConsulta } from '@/contexts/ConsultaContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  const { state } = useConsulta();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-padding`}>
        <div className={`${sizeClasses[size]} rounded-full ${
          state.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } m-0.5`} />
      </div>
      {text && (
        <p className={`text-sm font-medium ${
          state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
};
