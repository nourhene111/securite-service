const express = require('express'); 

const userRouter = require('./user.route');
const authRouter = require('./auth.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router); 
  router.use('/user', userRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;