import { useEffect, useState } from 'react';
import api from '../api/client';

const initial = { memberId: '', name: '', phone: '', email: '', address: '', status: 'Active' };

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(initial);

  const load = () => api.get('/members', { params: { search, status } }).then(({ data }) => setMembers(data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/members', form);
    setForm(initial);
    load();
  };

  const remove = async (id) => { await api.delete(`/members/${id}`); load(); };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="bg-white rounded-xl p-4 grid md:grid-cols-3 gap-3">
        {Object.keys(initial).map((key) => (
          <input key={key} placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="border rounded p-2" />
        ))}
        <button className="bg-blue-600 text-white rounded p-2">Add Member</button>
      </form>

      <div className="bg-white rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <input className="border rounded p-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="border rounded p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option><option>Active</option><option>Inactive</option>
          </select>
          <button className="bg-slate-800 text-white rounded px-3" onClick={load}>Apply</button>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left border-b">{['ID', 'Name', 'Phone', 'Email', 'Status', 'Actions'].map((h) => <th key={h} className="p-2">{h}</th>)}</tr></thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="border-b">
                  <td className="p-2">{m.memberId}</td><td className="p-2">{m.name}</td><td className="p-2">{m.phone}</td><td className="p-2">{m.email}</td><td className="p-2">{m.status}</td>
                  <td className="p-2"><button className="text-red-600" onClick={() => remove(m._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
