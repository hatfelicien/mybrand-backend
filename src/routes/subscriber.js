const express = require("express");
const subscriberController = require("../controllers/subscriber");

const router = express.Router();

router.post("/new", subscriberController.newSub);
router.get("/all", subscriberController.allsubs);
router.delete("/delete/:id", subscriberController.deletesub);

module.exports = router;
