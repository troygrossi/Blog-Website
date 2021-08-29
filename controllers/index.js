const router = require("express").Router();
const navRoutes = require("./routes");
const apiRoutes = require("./api/index.js");

router.use("/", navRoutes);
router.use("/api", apiRoutes);

module.exports = router;
