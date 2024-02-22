var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("board", { title: "게시글 작성" });
});

router.post("/", function (req, res, next) {
  const { title, context } = req.body;
  console.log("context: ", context);
  console.log("title: ", title);
});

module.exports = router;
