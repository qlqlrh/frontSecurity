var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("board", { title: "게시글 등록" });
});

router.post("/", function (req, res, next) {
  const { title, content } = req.body;
  console.log("title: ", title);
  console.log("content: ", content);
});

module.exports = router;
