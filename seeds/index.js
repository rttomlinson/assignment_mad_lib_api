const mongoose = require('mongoose');
const models = require('./../models');


Object.keys(models).forEach((modelName) => {
  global[modelName] = mongoose.model(modelName);
});


require('./../mongo')()
  .then(() => console.log('Cleaning Database...'))
  .then((arg) => {
    return require('./clean')();
  })
  .then(() => console.log('Seeding...'))
  .then(() => {
    return require('./seeds')();
  })
  .then(() => console.log('Done'))
  .catch((e) => console.error(e))
  .then(() => mongoose.disconnect());
