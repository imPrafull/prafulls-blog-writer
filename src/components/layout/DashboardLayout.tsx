import { useNavigate } from 'react-router-dom';
import { LogOut, PenSquare, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { auth } from '@/lib/auth';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const user = auth.getUser();

  const handleLogout = async () => {
    await auth.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="nav-brand">
              <PenSquare className="icon" />
              <span>Blog Writer</span>
            </div>
            <div className="nav-links">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
              >
                <FileText className="icon" />
                My Posts
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard/new')}
              >
                <PenSquare className="icon" />
                New Post
              </Button>
            </div>
          </div>
          <div className="nav-right">
            <span className="user-name">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="icon" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="dashboard-main">
        <div className="main-container">
          {children}
        </div>
      </main>
    </div>
  );
}