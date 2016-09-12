const rp       = require("request-promise");
const cheerio  = require("cheerio");
const mongoose = require("mongoose");
const config   = require("./config/config");
const Venue    = require("./models/venue");
const url      = "http://www.londonfashionweek.co.uk/Schedules?type=4;";

mongoose.connect(config.db);

rp(url)
.then((body, response) => {
const $   = cheerio.load(body);
const venue = $(".venue");

venues.each(i, venue) => {
name: $(venue).data(".div.col-sm-3"),
name: $(venue).data(".div.col-sm-3"),
}

});


// startups.each((i, startup) => {
//         let company = {
//           externalId:  $(startup).data("id"),
//           name:        $(startup).data("name"),
//           url:         $(startup).data("href"),
//           image:       $(startup).find(".main_link img").data("src"),
//           description: $(startup).find(".main_link p").text(),
//           city:        location.name
//         };
// rp(url)
// .then((body, response) => {
//   const $         = cheerio.load(body);
//   const cities    = $("#cityDrop option");
//   const locations = [];
//   cities.each((i, city) => {
//     let location = {
//       name: $(city).text(),
//       url:  $(city).val()
//     };
//     if (location.url && location.name) locations.push(location);
//   });

//   locations.forEach((location,i) => {
//     rp(location.url)
//     .then((body, response) => {
//       const $  = cheerio.load(body);
//       const startups  = $(".startup");
//       const count     = startups.length;
//       console.log(`I've found ${count} startups`);
//
//
//         Startup.create(company, (err, startup) => {
//           if (err) return console.error(err);
//           return console.log(`${startup.name} was saved.`);
//         });
//       })
//       .catch(console.err);
//     });
//   // });
// })
// .catch(console.err);
