const controller = require('../controllers/controller');

module.exports = (router) => {
  router.get('/', controller.getData);
  router.post('/api/data', controller.postData);
};
