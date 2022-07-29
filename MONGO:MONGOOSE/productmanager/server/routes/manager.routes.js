const ManagerController = require("../controllers/manager.controller");

module.exports = (app) => {
  app.get("/api/managers", ManagerController.findAllProducts);
  app.post("/api/managers", ManagerController.createNewProducts);
  app.get("/api/managers/:id", ManagerController.findOneProduct);
  app.put("/api/managers/:id", ManagerController.updateOneProduct);
  app.delete("/api/managers/:id", ManagerController.deletedProduct);
};
