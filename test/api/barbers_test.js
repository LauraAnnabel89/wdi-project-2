// router.route("/barbers")
//   .get(barbers.index);
// router.route("/barbers/:id")
//   .get(barbers.show);

require ("../spec_helper");

const Barber = require("../../models/barber");
const User   = require("../../models/user");

let TOKEN;

describe("Barber tests", () => {
  beforeEach(done => {
    Barber.collection.drop();
    done();
  });

  describe("GET /api/barbers", () => {

    beforeEach(done => {
      const barber = new barber({
        name: "Barber Shop",
        website: "www.barbershop.com",
        image: "http://fillmurray.com/200/300",
        vibe: "like a barbers",
        description: "some sort of barber",
        lat: "5757585",
        lng: "-585757372",
        otherServices: "shaving and such"
      });
      barber.save((err, barber) => {
        done();
      });

      it ("should return a 200 response", done => {
        api.get('/api/barbers')
          .set("Accept", "application/json")
          .expect(200, done);
      });
      it("should respond with a JSON object", done => {
        api.get("/api/barbers");
      });
      it("should return an object with the following keys", done => {
        api.get ("api/barbers")
          .set('Accept', "application/json")
          .end("")
      })
    });
  });
});
