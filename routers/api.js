const express = require("express");
const router = express();

router.get("/nouns", (req, res, next) => {
  let count = req.query.count;
  wordpos
    .randNoun({count})
    .then(nouns => {
      res.json(nouns);
    })
    .catch(next);
});

module.exports = router;
