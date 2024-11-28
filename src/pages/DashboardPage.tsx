import { DashboardLayout } from '@/components/layout/DashboardLayout';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="card">
        <div className="card-header">
          <h1>My Blog Posts</h1>
        </div>
        <div className="card-content">
          <p className="text-muted">No blog posts yet. Create your first post!</p>
        </div>
      </div>
    </DashboardLayout>
  );
}