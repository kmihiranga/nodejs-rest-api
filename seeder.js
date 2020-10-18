// @desc: generate db values using data file json files

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({path: './config/config.env'});

// load models
const Bootcamp = require('./models/Bootcamp');

// connect to DB
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read files
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    console.log('Data imported successfully....'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data Destroyed....'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// check process value in terminal
// @desc: node seeder -i
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
