const pool = require('../config/db');
const { hashPassword } = require('../utils/hash.utils');

const seedAdmin = async () => {
  const hashed = hashPassword('admin123');
  await pool.query(
    `INSERT INTO users (name, email, password, role) 
     VALUES ($1, $2, $3, $4) 
     ON CONFLICT (email) DO UPDATE SET password = $3`,
    ['Admin', 'admin@q3.com', hashed, 'admin']
  );
  console.log('Admin seeded successfully');
  process.exit();
};

seedAdmin();
