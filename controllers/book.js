const Book = require('../models/book');

function indexRoute(req, res, next) {
  Book
    .find()
    .populate('createdBy')
    .then((books) => res.json(books))
    .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;
  Book
    .create(req.body)
    .then((book) => res.status(201).json(book))
    .catch(next);
}

function showRoute(req, res, next) {
  Book
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .then((book) => {
      if(!book) return res.notFound();
      res.json(book);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  Book
    .findById(req.params.id)
    .exec()
    .then((book) => {
      if(!book) return res.notFound();

      for(const field in req.body) {
        book[field] = req.body[field];
      }

      return book.save();
    })
    .then((book) => res.json(book))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Book
    .findById(req.params.id)
    .exec()
    .then((book) => {
      if(!book) return res.notFound();
      return book.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
