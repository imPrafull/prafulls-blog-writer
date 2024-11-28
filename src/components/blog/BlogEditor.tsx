import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Form, FormField } from '../ui/Form';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type FormData = z.infer<typeof formSchema>;

export function BlogEditor() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      console.log('Blog Post Data:', {
        title: data.title,
        content: data.content,
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Blog post saved successfully');
      form.reset();
    } catch (error) {
      alert('Failed to save blog post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField label="Title" error={form.formState.errors.title?.message}>
        <Input
          {...form.register('title')}
          placeholder="Enter blog title"
          className="title-input"
        />
      </FormField>

      <FormField label="Content" error={form.formState.errors.content?.message}>
        <RichTextEditor
          content={form.getValues('content')}
          onChange={(content) => form.setValue('content', content)}
        />
      </FormField>

      <div className="form-actions">
        <Button type="submit" disabled={isSaving}>
          <Save className="icon" />
          {isSaving ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
    </Form>
  );
}