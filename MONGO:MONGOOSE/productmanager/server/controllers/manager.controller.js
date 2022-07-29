const Manager = require("../models/manager.model");

module.exports.findAllProducts = (req, res) => {
  Manager.find()
    .then((allProducts) => {
      res.json({ results: allProducts });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createNewProducts = (req, res) => {
  Manager.create(req.body)
    .then((newlyCreatedProduct) => {
      res.json({ results: newlyCreatedProduct });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.findOneProduct = (req, res) => {
  Manager.findOne({ _id: req.params.id })
    .then((product) => {
      res.json({ results: product });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updateOneProduct = (req, res) => {
  Manager.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((updatedProduct) => {
      res.json({ results: updatedProduct });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.deletedProduct = (req, res) => {
  Manager.findOneAndDelete({ _id: req.params.id })
    .then((product) => {
      res.json({ results: product });
    })
    .catch((err) => {
      res.json(err);
    });
};
