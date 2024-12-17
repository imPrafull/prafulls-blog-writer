import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BlogEditorForm } from '@/components/blog/BlogEditorForm';

export function NewPostPage() {
  return (
    <DashboardLayout>
      <div className="card">
        <div className="card-header">
          <h1>New Blog Post</h1>
        </div>
        <div className="card-content">
          <BlogEditorForm />
        </div>
      </div>
    </DashboardLayout>
  );
}