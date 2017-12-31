const router = require('express').Router();
const bookController = require('../controllers/book');

//to add later:
// const userController = require('../controllers/user');
// const auth = require('../controllers/auth');

// **************** BOOKS ****************

router.route('/book')
  .get(bookController.index)
  .post(bookController.create);

router.route('/book/:id')
  .get(bookController.show)
  .put(bookController.update)
  // .post(requestController.create)
  .delete(bookController.delete);

// **************** USERS ****************

// router.route('/users')
//   .get(userController.index); //landing page
//
// router.route('/users/:id')
//   .get(userController.show)
//   .put(imageUpload, userController.update)
//   .delete(secureRoute,userController.delete);

// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
