
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    ...props 
  }, ref) => {
    // Button style variants
    const buttonStyles = {
      primary: 'bg-form-accent-blue hover:bg-form-hover-blue text-white shadow-subtle',
      secondary: 'bg-white hover:bg-form-light-gray text-form-dark-gray border border-form-card-border',
      outline: 'bg-transparent border border-form-card-border hover:border-form-dark-gray text-form-dark-gray',
      ghost: 'bg-transparent hover:bg-form-light-gray text-form-dark-gray',
      link: 'bg-transparent text-form-accent-blue hover:underline p-0 shadow-none',
      danger: 'bg-form-accent-red hover:bg-opacity-90 text-white',
    };
    
    // Button size variants
    const sizeStyles = {
      sm: 'text-sm py-1 px-3 h-8',
      md: 'text-sm py-2 px-4 h-10',
      lg: 'text-base py-2 px-6 h-12',
      icon: 'p-2 aspect-square',
    };
    
    // Create button component without motion for type compatibility
    return (
      <button
        ref={ref}
        className={cn(
          'font-medium rounded-md inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          buttonStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
