require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const authMiddleware = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const memberRoutes = require('./routes/members');
const financeRoutes = require('./routes/finance');
const reportRoutes = require('./routes/reports');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/members', authMiddleware, memberRoutes);
app.use('/api/finance', authMiddleware, financeRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;
  const existing = await Admin.findOne({ email });
  if (existing) return;

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashedPassword });
  console.log(`Seeded admin: ${email}`);
};

const start = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
};

start();
