import { useEffect, useState } from 'react';
import api from '../api/client';

const config = {
  savings: { title: 'Savings', fields: ['memberId', 'amount', 'date', 'paymentMethod', 'notes'] },
  loans: { title: 'Loans', fields: ['memberId', 'amount', 'interest', 'startDate', 'dueDate', 'balance', 'status'] },
  shares: { title: 'Shares', fields: ['memberId', 'amount', 'date'] },
  fees: { title: 'Fees', fields: ['memberId', 'type', 'amount', 'date'] }
};

const FinancePage = ({ type }) => {
  const { title, fields } = config[type];
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(Object.fromEntries(fields.map((f) => [f, ''])));

  const load = () => api.get(`/finance/${type}`).then(({ data }) => setRecords(data));
  useEffect(() => { load(); }, [type]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/finance/${type}`, form);
    setForm(Object.fromEntries(fields.map((f) => [f, ''])));
    load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="bg-white rounded-xl p-4 grid md:grid-cols-3 gap-3">
        {fields.map((field) => <input key={field} className="border rounded p-2" placeholder={field} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />)}
        <button className="bg-blue-600 text-white rounded p-2">Add {title}</button>
      </form>
      <div className="bg-white rounded-xl p-4 overflow-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b text-left">{fields.map((f) => <th key={f} className="p-2">{f}</th>)}</tr></thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border-b">{fields.map((f) => <td key={f} className="p-2">{record[f]?.toString?.() || '-'}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePage;
