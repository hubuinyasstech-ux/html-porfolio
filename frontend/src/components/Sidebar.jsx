import { Link, useLocation } from 'react-router-dom';
import { BarChart3, CircleDollarSign, Coins, HandCoins, LayoutDashboard, Settings, Users, Wallet } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/savings', label: 'Savings', icon: Wallet },
  { to: '/loans', label: 'Loans', icon: HandCoins },
  { to: '/shares', label: 'Shares', icon: Coins },
  { to: '/fees', label: 'Fees', icon: CircleDollarSign },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings }
];

const Sidebar = ({ onClose }) => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 h-full bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Coop Admin</h1>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${pathname === to ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
