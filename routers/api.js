const Sentencer = require("sentencer");
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

router.post("/madlibs", (req, res, next) => {
  Sentencer.configure({
    nounList: req.body.nouns,
    adjectiveList: req.body.adjectives,
    verbsList: req.body.verbs,
    adverbsList: req.body.adverbs,
    actions: {
      adverb: function() {
        let i = Math.floor(Math.random() * adverbsList.length);
        return adverbsList[i];
      },
      verb: function() {
        let i = Math.floor(Math.random() * verbsList.length);
        return verbsList[i];
      }
    }
  });
  console.log("in the route", req.body.sentences);
  Promise.all(
    req.body.sentences.map(sentence => {
      sentence = Sentencer.make(sentence);
    })
  ).then(madlib => {
    res.json(madlib);
  });
});

module.exports = router;
