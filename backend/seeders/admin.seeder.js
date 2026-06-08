require('dotenv').config();
const pool = require('../config/db');
const { hashPassword } = require('../utils/hash.utils');

const users = [
  { name: 'Super Admin', email: 'admin@q3.com', password: 'admin123', role: 'admin' },
  { name: 'Sub Admin', email: 'subadmin@q3.com', password: 'subadmin123', role: 'subadmin' },
  { name: 'Employee One', email: 'employee@q3.com', password: 'employee123', role: 'employee' },
  { name: 'Driver One', email: 'driver@q3.com', password: 'driver123', role: 'driver' },
];

const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users...');

    for (const user of users) {
      const hashed = hashPassword(user.password);

      await pool.query(
        `INSERT INTO users (name, email, password, role, is_active)
         VALUES ($1, $2, $3, $4, true)
         ON CONFLICT (email)
         DO UPDATE SET
           name = EXCLUDED.name,
           password = EXCLUDED.password,
           role = EXCLUDED.role,
           is_active = true`,
        [user.name, user.email, hashed, user.role]
      );

      console.log(`✅ Seeded: ${user.email}`);
    }

    console.log('\n🎉 All users seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seedUsers();