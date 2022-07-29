const JobController = require("../controllers/Job.controller");

module.exports = (app) => {
  app.get("/api/jobs", JobController.findAllJobs);
  app.post("/api/jobs", JobController.createNewJobs);
  app.get("/api/jobs/:id", JobController.findOneJob);
  app.put("/api/jobs/:id", JobController.updateOneJob);
  app.delete("/api/jobs/:id", JobController.deletedJob);
};

// MAKE SURE THE SINGLUAR AND PLURAL ARE RIGHT FOR (APP) IN SERVER.JS, FUCKS UP OTHERWISE.
