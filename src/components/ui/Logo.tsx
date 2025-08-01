import { useTheme } from '../../contexts/ThemeContext';
import LogoDark from '../../assets/images/YoungSocial_logo_450blk.webp';
import LogoLight from '../../assets/images/YoungSocial_logow.webp';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const { effectiveTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={effectiveTheme === 'dark' ? LogoLight : LogoDark} 
        alt="YoungSocial Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function LogoWithText({
  className = '',
  size = 'md',
}: LogoProps) {
  const { effectiveTheme } = useTheme();

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo size={size} />
      <span className={`font-bold ${textSizes[size]} text-foreground`}>
        YoungSocial
      </span>
    </div>
  );
}