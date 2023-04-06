const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Connection successful'));

const app = require('./app');

const port = process.env.PORT || 3030;
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
