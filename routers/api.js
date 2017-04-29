const Sentencer = require("sentencer");
const express = require("express");
const router = express();
const wordPOS = require("wordpos");
const wordpos = new wordPOS();
const _ = require("lodash");

router.get("/nouns", (req, res, next) => {
    let count = req.query.count;
    wordpos
        .randNoun({
            count
        })
        .then(nouns => {
            res.json(nouns);
        })
        .catch(next);
});

router.get("/verbs", (req, res, next) => {
    let count = req.query.count;
    wordpos
        .randVerb({
            count
        })
        .then(verbs => {
            res.json(verbs);
        })
        .catch(next);
});

router.get("/adjectives", (req, res, next) => {
    let count = req.query.count;
    wordpos
        .randAdjective({
            count
        })
        .then(adjectives => {
            res.json(adjectives);
        })
        .catch(next);
});

router.get("/adverbs", (req, res, next) => {
    let count = req.query.count;
    wordpos
        .randAdverb({
            count
        })
        .then(adverbs => {
            res.json(adverbs);
        })
        .catch(next);
});

router.post("/madlibs", (req, res, next) => {
    //get POS from the body
    let words = req.body.words;
    let sentence = req.body.sentence;
    wordpos.getPOS(words, function(results) {
        console.log("results from getPOS", results);
        let adverbsAndVerbs = [];

        if (!(results.adverbs.length === 0)) {
            adverbsAndVerbs.push(results.adverbs);
        }
        else {
            adverbsAndVerbs.push(wordpos
                .randAdverb({
                    count: 100
                }));
        }
        if (!(results.verbs.length === 0)) {
            adverbsAndVerbs.push(results.verbs);
        }
        else {
            adverbsAndVerbs.push(wordpos
                .randAdverb({
                    count: 100
                }));
        }
        //Wait until adverbs and verbs have been collected
        //Also reasonable to have a saved list somewhere
        Promise.all(adverbsAndVerbs)
            .then(function([adverbsList, verbsList]) {
                Sentencer.configure({
                    nounList: results.nouns,
                    adjectiveList: results.adjectives,

                    actions: {
                        adverb: function() {
                            return _.sample(adverbsList);
                        },
                        verb: function() {
                            return _.sample(verbsList);
                        }
                    }
                });
                res.json(Sentencer.make(sentence));
            });
    });



});


module.exports = router;
