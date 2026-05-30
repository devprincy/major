require('dotenv').config();
const mongoose = require('mongoose');
const RoutineBlock = require('./models/RoutineBlock');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'));

const seedData = async () => {
  try {
    // Clear existing demo data
    await RoutineBlock.deleteMany({});
    console.log('Cleared existing blocks');

    // Create demo user if not exists
    let demoUser = await User.findOne({ email: 'demo@habitforge.com' });
    if (!demoUser) {
      const hashed = await bcrypt.hash('demo123', 10);
      demoUser = new User({
        name: 'Demo User',
        email: 'demo@habitforge.com',
        password: hashed,
        xp: 350,
        level: 5,
        badges: ['first_step', 'on_fire', 'consistency_king', 'xp_hunter']
      });
      await demoUser.save();
      console.log('Demo user created');
    }

    // Generate last 90 days of history
    const generateHistory = (daysBack, skipChance = 0.2) => {
      const history = [];
      const today = new Date();
      for (let i = daysBack; i >= 0; i--) {
        if (Math.random() > skipChance) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          history.push(d);
        }
      }
      return history;
    };

    // Create demo routine blocks with history
    const blocks = [
      {
        title: 'Morning Workout',
        startTime: '06:00',
        durationMins: 45,
        category: 'Health',
        streak: 12,
        isCompleted: false,
        completionHistory: generateHistory(90)
      },
      {
        title: 'Deep Work Session',
        startTime: '09:00',
        durationMins: 120,
        category: 'Work',
        streak: 8,
        isCompleted: false,
        completionHistory: generateHistory(90, 0.3)
      },
      {
        title: 'Read 30 mins',
        startTime: '20:00',
        durationMins: 30,
        category: 'Personal',
        streak: 5,
        isCompleted: false,
        completionHistory: generateHistory(90, 0.25)
      },
      {
        title: 'Meditation',
        startTime: '07:00',
        durationMins: 15,
        category: 'Health',
        streak: 3,
        isCompleted: false,
        completionHistory: generateHistory(90, 0.4)
      },
      {
        title: 'Evening Walk',
        startTime: '18:00',
        durationMins: 30,
        category: 'Health',
        streak: 6,
        isCompleted: false,
        completionHistory: generateHistory(90, 0.35)
      }
    ];

    await RoutineBlock.insertMany(blocks);
    console.log('Demo blocks created with 90 days of history!');
    console.log('Demo login: demo@habitforge.com / demo123');

    mongoose.connection.close();
  } catch (err) {
    console.log('Seed error:', err);
    mongoose.connection.close();
  }
};

seedData();