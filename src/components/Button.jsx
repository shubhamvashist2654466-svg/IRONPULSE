import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'md', // sm, md, lg
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] select-none disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-neon text-black hover:bg-neon-hover shadow-neon-sm hover:shadow-neon font-bold',
    secondary: 'bg-dark-800 text-white hover:bg-dark-700 border border-dark-600 hover:border-dark-500',
    outline: 'border-2 border-neon text-neon hover:bg-neon hover:text-black',
    ghost: 'text-zinc-300 hover:text-white hover:bg-dark-800/80',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 tracking-wide uppercase',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}

