import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    const baseClass = 'input';
    const errorClass = error ? 'input-error' : '';
    
    return (
      <input
        ref={ref}
        className={`${baseClass} ${errorClass} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';