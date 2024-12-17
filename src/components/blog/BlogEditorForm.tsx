import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Form, FormField } from '../ui/Form';
import { RichTextEditor } from './RichTextEditor';
import { useBlogEditor } from '@/hooks/useBlogEditor';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type FormData = z.infer<typeof formSchema>;

export function BlogEditorForm() {
  const { isSubmitting, error, saveBlogPost } = useBlogEditor();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await saveBlogPost(data.title, data.content);
    } catch (error) {
      // Error is handled by useBlogEditor hook
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <FormField label="Title" error={form.formState.errors.title?.message}>
        <Input
          {...form.register('title')}
          placeholder="Enter blog title"
          className="title-input"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Content" error={form.formState.errors.content?.message}>
        <RichTextEditor
          content={form.getValues('content')}
          onChange={(content) => form.setValue('content', content)}
          disabled={isSubmitting}
        />
      </FormField>

      <div className="form-actions">
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
    </Form>
  );
}