const express = require("express");
const {
  getFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/food");
const giveAccess = require("../middlewares/access");
const router = express.Router();

router.get("/", getFoodItems);
router.post("/", giveAccess(["ADMIN", "SUPER_ADMIN"]), addFoodItem);
router.patch("/:id", giveAccess(["ADMIN", "SUPER_ADMIN"]), updateFoodItem);
router.delete("/:id", giveAccess(["ADMIN", "SUPER_ADMIN"]), deleteFoodItem);

module.exports = router;