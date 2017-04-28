const app = require("../app");
const request = require("request");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const qs = require("qs");

describe("App", () => {
  const baseUrl = "http://localhost:8081";
  const apiUrl = baseUrl + "/api/v1/";
  let server;
  let user;
  const apiUrlFor = (type, params) => {
    params = params ? `&${qs.stringify(params)}` : "";
    return `${apiUrl}${type}?token=${user.token}${params}`;
  };
  const j = str => JSON.parse(str);

  beforeAll(done => {
    server = app.listen(8081, () => {
      done();
    });
  });

  beforeEach(done => {
    User.create({
      fname: "Foo",
      lname: "Bar",
      email: "foobar@gmail",
      password: "password"
    }).then(result => {
      user = result;
      done();
    });
  });

  afterAll(done => {
    server.close();
    server = null;
    done();
  });

  // ----------------------------------------
  // App
  // ----------------------------------------
  it("renders the home page", done => {
    request.get(baseUrl, (err, res, body) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  describe("Api call", () => {
    // ----------------------------------------
    // POS Endpoints
    // ----------------------------------------
    describe("nouns endpoint", () => {
      it("returns an array", done => {
        request.get(
          apiUrlFor("nouns", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(Array.isArray(result)).toBe(true);
            done();
          }
        );
      });

      it("contains the number of nouns in the count parameter", done => {
        request.get(
          apiUrlFor("nouns", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(10);
            done();
          }
        );
      });

      it("contains the number of nouns in the count parameter", done => {
        request.get(
          apiUrlFor("nouns", {
            count: 100
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(100);
            done();
          }
        );
      });
    });
    describe("verb endpoint", () => {
      it("returns an array", done => {
        request.get(
          apiUrlFor("verbs", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(Array.isArray(result)).toBe(true);
            done();
          }
        );
      });

      it("contains the number of verbs in the count parameter", done => {
        request.get(
          apiUrlFor("verbs", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(10);
            done();
          }
        );
      });

      it("contains the number of verbs in the count parameter", done => {
        request.get(
          apiUrlFor("verbs", {
            count: 100
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(100);
            done();
          }
        );
      });
    });
    describe("adjective endpoint", () => {
      it("returns an array", done => {
        request.get(
          apiUrlFor("adjectives", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(Array.isArray(result)).toBe(true);
            done();
          }
        );
      });

      it("contains the number of adjectives in the count parameter", done => {
        request.get(
          apiUrlFor("adjectives", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(10);
            done();
          }
        );
      });

      it("contains the number of adjectives in the count parameter", done => {
        request.get(
          apiUrlFor("adjectives", {
            count: 100
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(100);
            done();
          }
        );
      });
    });
    describe("adverb endpoint", () => {
      it("returns an array", done => {
        request.get(
          apiUrlFor("adverbs", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(Array.isArray(result)).toBe(true);
            done();
          }
        );
      });

      it("contains the number of adverbs in the count parameter", done => {
        request.get(
          apiUrlFor("adverbs", {
            count: 10
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(10);
            done();
          }
        );
      });

      it("contains the number of adverbs in the count parameter", done => {
        request.get(
          apiUrlFor("adverbs", {
            count: 100
          }),
          (err, res, body) => {
            let result = j(body);
            expect(result.length).toBe(100);
            done();
          }
        );
      });
    });
  });
});
