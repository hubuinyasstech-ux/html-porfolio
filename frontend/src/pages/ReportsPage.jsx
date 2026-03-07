import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api/client';

const ReportsPage = () => {
  const [totals, setTotals] = useState({ savings: 0, loans: 0, shares: 0, fees: 0 });

  useEffect(() => {
    api.get('/reports').then(({ data }) => setTotals(data.totals)).catch(() => {});
  }, []);

  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white rounded-xl p-4 h-[360px]">
      <h3 className="font-semibold text-slate-700 mb-4">Financial Reports</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportsPage;
