import { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

interface FormFieldProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return (
    <form {...props}>
      {children}
    </form>
  );
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}