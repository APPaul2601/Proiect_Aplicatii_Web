const router = require("express").Router();
const { getUpgrades } = require("../controllers/shopController");

router.get("/upgrades", getUpgrades);

module.exports = router;
