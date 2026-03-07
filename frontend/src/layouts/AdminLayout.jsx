import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block"><Sidebar /></div>
      {open && (
        <div className="fixed inset-0 z-20 md:hidden bg-black/30" onClick={() => setOpen(false)}>
          <div className="h-full" onClick={(e) => e.stopPropagation()}><Sidebar onClose={() => setOpen(false)} /></div>
        </div>
      )}
      <div className="flex-1">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center">
          <button className="md:hidden" onClick={() => setOpen(true)}><Menu /></button>
          <h2 className="font-semibold text-slate-700">Cooperative & Investment Management</h2>
          <button className="flex gap-2 text-sm items-center text-slate-600" onClick={logout}><LogOut className="h-4" />Logout</button>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
