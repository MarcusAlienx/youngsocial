interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'black';
}

export function Logo({ className = '', size = 'md', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textColor = {
    default: 'text-foreground',
    white: 'text-white',
    black: 'text-black'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center relative`}>
      {/* Main Circle Background */}
      <div className={`w-full h-full rounded-full ${
        variant === 'white'
          ? 'bg-white'
          : variant === 'black'
            ? 'bg-black'
            : 'bg-gradient-to-br from-gray-900 to-gray-700'
      } flex items-center justify-center relative overflow-hidden`}>

        {/* YS Text */}
        <div className={`font-bold ${
          size === 'sm' ? 'text-sm' :
          size === 'md' ? 'text-lg' :
          size === 'lg' ? 'text-2xl' :
          'text-3xl'
        } ${
          variant === 'black' ? 'text-white' :
          variant === 'white' ? 'text-black' :
          'text-white'
        } tracking-tight`}>
          YS
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1 right-1 w-1 h-1 bg-red-500 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-blue-500 rounded-full" />
        <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-500 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full" />
      </div>
    </div>
  );
}

export function LogoWithText({
  className = '',
  size = 'md',
  variant = 'default'
}: LogoProps) {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo size={size} variant={variant} />
      <span className={`font-bold ${textSizes[size]} ${
        variant === 'white' ? 'text-white' :
        variant === 'black' ? 'text-black' :
        'text-foreground'
      }`}>
        YoungSocial
      </span>
    </div>
  );
}
