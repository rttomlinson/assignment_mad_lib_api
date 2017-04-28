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

    it("returns JSON object containing an array of nouns", done => {
      request.get(apiUrlFor("nouns", {count: 10}), (err, res, body) => {
        let result = j(body);
        expect(Array.isArray(result)).toBe(true);
        done();
      });
    });

    xit("contains the number of nouns in the count parameter", done => {
      request.get(apiUrlFor("nouns", {count: 10}), (err, res, body) => {
        let result = j(body);
        expect(result.nouns.length).toBe(10);
        done();
      });
    });

    xit("contains the number of nouns in the count parameter", done => {
      request.get(apiUrlFor("nouns", {count: 100}), (err, res, body) => {
        let result = j(body);
        expect(result.nouns.length).toBe(100);
        done();
      });
    });
  });
});
