const router = require("express").Router();
const { authenticate, validateBody, upload } = require("../../middlewares");
const ctrl = require("../../controllers/users");

const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  upload.single("avatar"),
  ctrl.updateUser
);

module.exports = router;
