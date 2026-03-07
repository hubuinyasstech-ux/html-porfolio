const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
    <div className="flex items-center justify-between">
      <p className="text-slate-500 text-sm">{title}</p>
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <h3 className="text-2xl font-semibold text-slate-800 mt-2">{value}</h3>
  </div>
);

export default StatCard;
