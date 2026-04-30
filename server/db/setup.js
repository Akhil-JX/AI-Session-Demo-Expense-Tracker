import db from './connection.js';

const setupDatabase = () => {
  try {
    console.log('🔧 Setting up SQLite database...');

    // Create expenses table
    db.exec(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index for faster queries
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_expenses_created_at
      ON expenses(created_at DESC);
    `);

    console.log('✅ Database setup complete!');
    console.log('');
    console.log('📊 Database structure:');
    console.log('   File: expense_tracker.db');
    console.log('   Table: expenses');
    console.log('   Columns:');
    console.log('     - id: INTEGER PRIMARY KEY AUTOINCREMENT');
    console.log('     - amount: REAL');
    console.log('     - category: TEXT');
    console.log('     - description: TEXT');
    console.log('     - created_at: DATETIME');
    console.log('     - updated_at: DATETIME');
    console.log('');
    console.log('🚀 Ready to start the server!');
    console.log('   npm run dev:server');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
};

setupDatabase();
