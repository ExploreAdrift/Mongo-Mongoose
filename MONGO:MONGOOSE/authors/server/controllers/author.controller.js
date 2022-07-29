const Author = require("../models/author.model");

module.exports.findAllAuthors = (req, res) => {
  Author.find()
    .then((allAuthors) => {
      res.json({ results: allAuthors });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createNewAuthor = (req, res) => {
  Author.create(req.body)
    .then((newlyCreatedAuthor) => {
      res.json({ results: newlyCreatedAuthor });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.findOneAuthor = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((author) => {
      res.json({ results: author });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updateOneAuthor = (req, res) => {
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((updatedAuthor) => {
      res.json({ results: updatedAuthor });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.deletedAuthor = (req, res) => {
  Author.findOneAndDelete({ _id: req.params.id })
    .then((author) => {
      res.json({ results: author });
    })
    .catch((err) => {
      res.json(err);
    });
};
