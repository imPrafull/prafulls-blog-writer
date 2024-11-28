import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, FormField } from '@/components/ui/Form';
import { auth } from '@/lib/auth';
import type { LoginFormData } from '@/types/auth';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await auth.login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="nav-brand">
            <Pen className="h-6 w-6" />
            <span>Blog Writer</span>
          </div>
        </div>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
          </FormField>
          
          <FormField label="Password" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
          </FormField>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
}