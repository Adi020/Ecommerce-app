const app = require('./app');
const { db } = require('./database/config');
const generateData = require('./utils/data/Data');

db.authenticate()
  .then(() => console.log('database conected...'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => {
    // await generateData();
    console.log('database synchronized');
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
