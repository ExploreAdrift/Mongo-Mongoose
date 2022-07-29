const Job = require("../models/job.model");

module.exports.findAllJobs = (req, res) => {
  Job.find()
    .then((allJobs) => {
      res.json({ results: allJobs });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createNewJobs = (req, res) => {
  Job.create(req.body)
    .then((newlyCreatedJob) => {
      res.json({ results: newlyCreatedJob });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.findOneJob = (req, res) => {
  Job.findOne({ _id: req.params.id })
    .then((job) => {
      res.json({ results: job });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updateOneJob = (req, res) => {
  Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((updatedJob) => {
      res.json({ results: updatedJob });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.deletedJob = (req, res) => {
  Job.findOneAndDelete({ _id: req.params.id })
    .then((job) => {
      res.json({ results: job });
    })
    .catch((err) => {
      res.json(err);
    });
};
