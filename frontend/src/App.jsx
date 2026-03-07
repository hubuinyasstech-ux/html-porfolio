import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import FinancePage from './pages/FinancePage';
import LoginPage from './pages/LoginPage';
import MemberProfilePage from './pages/MemberProfilePage';
import MembersPage from './pages/MembersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const AppRoutes = () => (
  <ProtectedRoute>
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/:id" element={<MemberProfilePage />} />
        <Route path="/savings" element={<FinancePage type="savings" />} />
        <Route path="/loans" element={<FinancePage type="loans" />} />
        <Route path="/shares" element={<FinancePage type="shares" />} />
        <Route path="/fees" element={<FinancePage type="fees" />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  </ProtectedRoute>
);

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<AppRoutes />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
