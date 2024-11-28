import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BlogEditor } from '@/components/blog/BlogEditor';

export function NewPostPage() {
  return (
    <DashboardLayout>
      <div className="card">
        <div className="card-header">
          <h1>New Blog Post</h1>
        </div>
        <div className="card-content">
          <BlogEditor />
        </div>
      </div>
    </DashboardLayout>
  );
}