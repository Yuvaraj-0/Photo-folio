import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI environment variable is not defined. Please check your .env file.');
      console.error('📄 Expected format: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔥 Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
