const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`Connection established: ${conn.connection.host}`);
};

module.exports = connectDB;
