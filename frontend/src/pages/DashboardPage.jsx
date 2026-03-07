import { Coins, HandCoins, Receipt, Users, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api/client';
import StatCard from '../components/StatCard';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalMembers: 0, totalSavings: 0, totalLoans: 0, totalShares: 0, totalFees: 0 });

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  const cards = [
    { title: 'Total Members', value: stats.totalMembers, icon: Users },
    { title: 'Total Savings', value: stats.totalSavings, icon: Wallet },
    { title: 'Total Loans', value: stats.totalLoans, icon: HandCoins },
    { title: 'Total Shares', value: stats.totalShares, icon: Coins },
    { title: 'Total Fees Collected', value: stats.totalFees, icon: Receipt }
  ];

  return <section className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">{cards.map((c) => <StatCard key={c.title} {...c} />)}</section>;
};

export default DashboardPage;
