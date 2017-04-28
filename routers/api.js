const express = require("express");
const router = express();
const wordPOS = require("wordpos");
const wordpos = new wordPOS();

router.get("/nouns", (req, res, next) => {
  let count = req.query.count;
  wordpos
    .randNoun({count})
    .then(nouns => {
      res.json(nouns);
    })
    .catch(next);
});

router.get("/verbs", (req, res, next) => {
  let count = req.query.count;
  wordpos
    .randVerb({count})
    .then(verbs => {
      res.json(verbs);
    })
    .catch(next);
});

router.get("/adjectives", (req, res, next) => {
  let count = req.query.count;
  wordpos
    .randAdjective({count})
    .then(adjectives => {
      res.json(adjectives);
    })
    .catch(next);
});

router.get("/adverbs", (req, res, next) => {
  let count = req.query.count;
  wordpos
    .randAdverb({count})
    .then(adverbs => {
      res.json(adverbs);
    })
    .catch(next);
});

module.exports = router;
