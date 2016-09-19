const mongoose = require("mongoose");
const config   = require("../config/config");
const Barber   = require("../models/barber");
const path     = require("path");

mongoose.connect(config.db);

const barbers = [
  {
    name:           "The Refinery - Mayfair",
    website:        "https://www.the-refinery.com/",
    image:          "https://www.the-refinery.com/wp-content/themes/twentythirteen/images/contact_refinery.png",
    vibe:           "Upscale boutique meets Saville Row",
    description:    "The Refinery is Londons one-stop Grooming Emporium for men. Established in January 2000 we offer barbering, skincare and spa treatments in exclusive luxury retreats in Mayfair and Harrods, Knightsbridge.",
    lat:            "51505777",
    lng:            "-155126",
    otherServices:  "Shaving, Facial, Manicure, Massage"
  },
  {
    name:           "The Refinery - Harrods",
    website:        "https://www.the-refinery.com/",
    image:          "http://enclothed.co.uk/wp-content/uploads/2015/08/the-refinery.jpg",
    vibe:           "Upscale boutique meets Saville Row",
    description:    "The Refinery is Londons one-stop Grooming Emporium for men. Established in January 2000 we offer barbering, skincare and spa treatments in exclusive luxury retreats in Mayfair and Harrods, Knightsbridge.",
    lat:            "51.4987204",
    lng:            "-0.1644124",
    otherServices:  "Shaving, Facial, Manicure, Massage"
  },
  {
    name:           "Ruffians - Marylebone",
    website:        "http://ruffians.co.uk/",
    image:          "http://britishbarbers.com/uploads/564332ed21fb4.png",
    vibe:           "Easy-going, quirky and stylish, a little slice of Edinburgh in the heart of London",
    description:    "Ruffians Barbers is an award-winning barber shop and store, giving the best quality haircuts and cut-throat shaves. Our staff are hand-picked for their exceptional skills and are carefully trained to guarantee you always receive our high Ruffians standard.",
    lat:            "51.516071",
    lng:            "-0.1513205",
    otherServices:   "Shaving, Moustache Trims, Beard Tidies"
  },
  {
    name:           "Ruffians - Covent Garden",
    website:        "http://ruffians.co.uk/",
    image:          "http://www.joshwasaintjames.com/wp-content/uploads/2015/07/ruffians.jpg",
    vibe:           "Easy-going, quirky and stylish, a little slice of Edinburgh in the heart of London",
    description:    "Ruffians Barbers is an award-winning barber shop and store, giving the best quality haircuts and cut-throat shaves. Our staff are hand-picked for their exceptional skills and are carefully trained to guarantee you always receive our high Ruffians standard.",
    lat:            "51.5106761",
    lng:            "-0.1249285",
    otherServices:   "Shaving, Moustache Trims, Beard Tidies"
  },
  {
    name:           "PankHurst London",
    website:        "http://www.pankhurstlondon.com/",
    image:          "http://static2.fashionbeans.com/wp-content/uploads/2013/09/pank.jpg",
    vibe:           "A very classy affair, think Bond and you're not far off",
    description:    "Part speakeasy, part gentleman’s club, the Pankhurst barbershop is a haven of masculinity just off Carnaby St. Each of our bespoke barbers’ chairs has been hand upholstered by the expert leather craftsmen at Bentley motors, making them the most sumptuous chairs in London in which to sit back for a shave or a trim.",
    lat:            "51.513842",
    lng:            "-0.139853",
    otherServices:   "Shaving, Massage"
  },
  {
    name:           "Joe and Co.",
    website:        "http://www.joeandco.net/",
    image:          "http://google.localdataimages.com/800_WM/2277/22771259.jpg",
    vibe:           "Cool, contemporary and chilled-out with a teeny bit of hipster thrown in",
    description:    "A contemporary Barbershop based in Soho, Joe and Co. offers all the frills and service you would expect from a superior men's salon, but with a focus on an informal atmosphere.",
    lat:            "51.5126541",
    lng:            "-0.1357265",
    otherServices:  "Shaving, Beard and Moustache Trims, Technical Issues"
  },
  {
    name:           "Tommy Guns - Soho",
    website:        "http://tommyguns.co.uk/",
    image:          "https://img.grouponcdn.com/seocms/o85V16WHZpYk7yVPsowJ/jS-600x450.jpg",
    vibe:           "An institution of mens hairdressing - cool, decadent but relaxed",
    description:    "Since 1994 we have built an enviable reputation for delivering iconic looks and trends in our fabulous salons in Soho and Shoreditch London, we offer a relaxed but professional atmosphere combined with the best hair stylists London has to offer.",
    lat:            "51.5128518",
    lng:            "-0.1373596",
    otherServices:  "Color, Ladies Hairdressing"
  },
  {
    name:           "Tommy Guns - Shoreditch",
    website:        "http://tommyguns.co.uk/",
    image:          "https://s3-media2.fl.yelpcdn.com/bphoto/8dfVSNY9_kfZu1jPpfDRSw/348s.jpg",
    vibe:           "An institution of mens hairdressing - cool, decadent but relaxed",
    description:    "Since 1994 we have built an enviable reputation for delivering iconic looks and trends in our fabulous salons in Soho and Shoreditch London, we offer a relaxed but professional atmosphere combined with the best hair stylists London has to offer.",
    lat:            "51.5256742",
    lng:            "-0.0815347",
    otherServices:  "Color, Ladies Hairdressing"
  },
  {
    name:           "Murdock London - Soho",
    website:        "https://www.murdocklondon.com/",
    image:          "https://www.murdocklondon.com/media/wysiwyg/Content/Brewer-Street.jpg",
    vibe:           "A classic barbers",
    description:    "At the heart of Murdock London are our grooming experiences. Classic barber services such as Traditional Wet Shaves, Full Beard Reshapes and Restyle Haircuts, inspired by the grand heritage of St James’ barbershops but tailored for modern, style-conscious men",
    lat:            "51.5134648",
    lng:            "-0.1402395",
    otherServices:  "Shave, Beard and Moustache Shaping, Facial, Manicure, Shoe Shine"
  },
  {
    name:           "Murdock London - Covent Garden",
    website:        "https://www.murdocklondon.com/",
    image:          "http://i0.wp.com/dapperchapper.com/wp-content/uploads/2014/11/murdock.jpg",
    vibe:           "A classic barbers",
    description:    "At the heart of Murdock London are our grooming experiences. Classic barber services such as Traditional Wet Shaves, Full Beard Reshapes and Restyle Haircuts, inspired by the grand heritage of St James’ barbershops but tailored for modern, style-conscious men",
    lat:            "51.5131018",
    lng:            "-0.1402905",
    otherServices:  "Shave, Beard and Moustache Shaping, Facial, Manicure, Shoe Shine"
  },
  {
    name:           "Murdock London - Shoreditch",
    website:        "https://www.murdocklondon.com/",
    image:          "https://s3-media2.fl.yelpcdn.com/bphoto/j0UqH1aFdCQRXwUs4HzoGQ/ls.jpg",
    vibe:           "A classic barbers",
    description:    "At the heart of Murdock London are our grooming experiences. Classic barber services such as Traditional Wet Shaves, Full Beard Reshapes and Restyle Haircuts, inspired by the grand heritage of St James’ barbershops but tailored for modern, style-conscious men",
    lat:            "51.5244333",
    lng:            "-0.0759985",
    otherServices:  "Shave, Beard and Moustache Shaping, Facial, Manicure, Shoe Shine"
  },
  {
    name:            "Aveda Men",
    website:         "http://www.avedainstitute.co.uk/men.php",
    image:           "http://www.avedainstitute.co.uk/d.aveda/media/images/men/2015/men_bg_v2.jpg",
    vibe:            "Earthy, chilled, professional",
    description:     "The merging of traditional barbering and holistic well-being, bringing you the best in grooming and men’s maintenance - all from one chair",
    lat:             "51.518684",
    lng:             "-0.1386955",
    otherServices:   "Shave, Facial, Manicure"
  },
  {
    name:             "Geo.F.Trumper - St James",
    website:          "https://www.trumpers.com/",
    image:            "http://looking-at-london.com/wp-content/uploads/2015/08/Gentlemans-Hairdresser-St.-Jamess-Sony-370.jpg",
    vibe:             "As close to a Empire-era shave as you'll ever get",
    description:      "Trumper offer a comprehensive haircutting service for all styles. At Trumper we deal with the image as an integral part of the service and will be pleased to advise on a style to suit you and advise on hair care and how to keep a style looking perfect.",
    lat:              "51.5084496",
    lng:              "-0.1370256",
    otherServices:    "Colour, Shaving, Manicure, Pedicure, Massage, Moustache and Beard Trim"
  },
  {
    name:             "Geo.F.Trumper - Mayfair",
    website:          "https://www.trumpers.com/",
    image:            "https://s3-media1.fl.yelpcdn.com/bphoto/S0PA3thvK32cIcEtpoXBBQ/o.jpg",
    vibe:             "As close to a Empire-era shave as you'll ever get",
    description:      "Trumper offer a comprehensive haircutting service for all styles. At Trumper we deal with the image as an integral part of the service and will be pleased to advise on a style to suit you and advise on hair care and how to keep a style looking perfect.",
    lat:              "51.5070924",
    lng:              "-0.1466685",
    otherServices:    "Colour, Shaving, Manicure, Pedicure, Massage, Moustache and Beard Trim"
  },
  {
    name:              "Jones and Payne - Covent Garden",
    website:           "http://www.jonesandpayne.com/",
    image:             "http://static1.squarespace.com/static/53309469e4b0d750ebcc4c11/5331fb28e4b0dbc1d5c98202/5331fb37e4b009c4e69450e4/1395784530910/jones_and_payne_lee_goldup_022.jpg",
    vibe:              "Old-school barber meets hipster paradise",
    description:       "Jones & Payne have combined West End luxury and East London ‘cool’ resulting in a unique and luxury salon experience in London.",
    lat:               "51.5105998",
    lng:               "-0.12688",
    otherServices:     "Colour, Ladies Hairdressing"
  },
  {
    name:              "Jones and Payne - Shoreditch",
    website:           "http://www.jonesandpayne.com/",
    image:             "http://4.bp.blogspot.com/-oOTzmSPzVII/TsbaQ9Ks55I/AAAAAAAACos/jAfKs5Mm6KQ/s1600/310979_10100203246948895_61411014_51912451_132490172_n.jpg",
    vibe:              "Old-school barber meets hipster paradise",
    description:       "Jones & Payne have combined West End luxury and East London ‘cool’ resulting in a unique and luxury salon experience in London.",
    lat:               "51.5245709",
    lng:               "-0.0816711",
    otherServices:     "Colour, Ladies Hairdressing"
  },
  {
    name:             "Ted's Grooming Room - Holborn",
    website:          "https://tedsgroomingroom.com/",
    image:            "https://tedsgroomingroom.com/wp-content/uploads/2015/11/tgr_theobolds_road_4-1000x666.jpg?timestamp=1473706770025",
    vibe:             "If you're a Ted fan you'll love this - uniform, stylish and traditional",
    description:      "In his quest for the perfect shave, ted discovered the ancient crafts and techniques of the ottoman empire’s master barbers. Applying their secrets and know-how, ted has recreated this invigorating experience at ten unique locations in Central London",
    lat:              "51.5202687",
    lng:              "-0.1181558",
    otherServices:    "Eyebrow Threading, Shaving, Facial"
  },
  {
    name:             "Ted's Grooming Room - Shoreditch",
    website:          "https://tedsgroomingroom.com/",
    image:            "https://tedsgroomingroom.com/wp-content/uploads/2015/10/tgr_commercial_street_1-1000x666.jpg?timestamp=1473706642751",
    vibe:             "If you're a Ted fan you'll love this - uniform, stylish and traditional",
    description:      "In his quest for the perfect shave, ted discovered the ancient crafts and techniques of the ottoman empire’s master barbers. Applying their secrets and know-how, ted has recreated this invigorating experience at ten unique locations in Central London",
    lat:              "51.5214138",
    lng:              "-0.0756581",
    otherServices:    "Eyebrow Threading, Shaving, Facial"
  },
  {
    name:             "Ted's Grooming Room - St Paul's",
    website:          "https://tedsgroomingroom.com/",
    image:            "https://tedsgroomingroom.com/wp-content/uploads/2015/11/tgr_cheapside_3-1000x666.jpg?timestamp=1473706791606",
    vibe:             "If you're a Ted fan you'll love this - uniform, stylish and traditional",
    description:      "In his quest for the perfect shave, ted discovered the ancient crafts and techniques of the ottoman empire’s master barbers. Applying their secrets and know-how, ted has recreated this invigorating experience at ten unique locations in Central London",
    lat:              "51.5140079",
    lng:              "-0.0953854",
    otherServices:    "Eyebrow Threading, Shaving, Facial"
  },
  {
    name:             "Ted's Grooming Room - Fitzrovia",
    website:          "https://tedsgroomingroom.com/",
    image:            "https://tedsgroomingroom.com/wp-content/uploads/2015/11/tgr_mortimer_street_2-1000x666.jpg?timestamp=1473706929659",
    vibe:             "If you're a Ted fan you'll love this - uniform, stylish and traditional",
    description:      "In his quest for the perfect shave, ted discovered the ancient crafts and techniques of the ottoman empire’s master barbers. Applying their secrets and know-how, ted has recreated this invigorating experience at ten unique locations in Central London",
    lat:              "51.51878",
    lng:              "-0.13535",
    otherServices:    "Eyebrow Threading, Shaving, Facial"
  },
  {
    name:             "Gentlemen's Tonic",
    website:          "http://www.gentlemenstonic.com/",
    image:            "http://www.barber-shops.londonschoolofbarbering.com/wp-content/uploads/2014/12/3451b1ce-ab0e-4166-a5e4-3bca5d500c38-711x400.jpeg",
    vibe:             "Traditional, slick, West-London-Gent-Esque",
    description:      "Gentlemen’s Tonic is a luxury establishment founded in 2004 in the heart of Mayfair, that affords the modern man a traditional barbershop and a variety of lifestyle and grooming services.",
    lat:              "51.5111964",
    lng:              "-0.1461134",
    otherServices:    "Shaving, Facial, Massage, Packages"
  },
  {
    name:             "Sharps - Fitzrovia",
    website:          "http://www.sharpsbarbers.com/",
    image:             "http://www.sharpsbarbers.com/img/windmill/01.jpg",
    vibe:             "The new generation of barbers",
    description:      "SHARPS opened for business in 2002 to help get guys comfortable in their own skin and spark a major movement around new-school barbering. Grooming sounds stuffy and boring so we call it PREP. We believe that being prepared in life can make all the difference.",
    lat:              "51.5187056",
    lng:              "-0.1345012",
    otherServices:     "Shave, Hot-Towel"
  },
  {
    name:              "Fish",
    website:           "http://www.fishsoho.com/",
    image:             "http://i1056.photobucket.com/albums/t374/phodiaries/phodiaries001/London/image1_zps8t96ghau.jpg",
    vibe:              "Punk rock meets established barbers",
    description:       "In 1987, hairdresser and entrepreneur Paul Burfoot bought 30 D'Arblay Street, an old sex shop, and set about converting it into a salon. While renovating, Paul exposed beautiful art deco tiles revealing that the shop was once a fishmongers - and so 'Fish Hairdressing' was born.",
    lat:               "51.5147246",
    lng:               "-0.1358768",
    otherServices:     "Colour, Ladies Hairdressing"
  },
  {
    name:               "Pall Mall Barbers - Fitzrovia",
    website:            "http://www.pallmallbarbers.com/",
    image:              "http://www.pallmallbarbers.com/wp-content/themes/pallmallbarbers-4-woocommerce/library/images/location-fitzrovia-248x165.jpg?b2ea39",
    vibe:               "The don of barbers",
    description:        "Offering up-to-date barbering services to suit the modern man, Pall Mall Barbers Fitzrovia provides both classic and contemporary men's hairdressing and barbering, as well as beard trimming and wet shaving service",
    lat:                "51.523952",
    lng:                "-0.1410328",
    otherServices:      "Shave, Beard Shaping, Massage"
  },
  {
    name:               "Pall Mall Barbers - Westminster",
    website:            "http://www.pallmallbarbers.com/",
    image:              "http://www.pallmallbarbers.com/wp-content/uploads/2014/11/MG_1695.jpg?b2ea39",
    vibe:               "The don of barbers",
    description:        "Offering up-to-date barbering services to suit the modern man, Pall Mall Barbers Fitzrovia provides both classic and contemporary men's hairdressing and barbering, as well as beard trimming and wet shaving service",
    lat:                "51.4991658",
    lng:                "-0.1358193",
    otherServices:      "Shave, Beard Shaping, Massage"
  },
  {
    name:               "Barber Streisand",
    website:            "http://barberstreisand.com/",
    image:              "http://exmouth.london/wp-content/uploads/2015/12/thirdspacer_1520150091539071_235149163_n.jpg",
    vibe:               "Go for the name, stay for the cool interior and top-notch hairdressing!",
    description:        "Barber Streisand is an offbeat unisex barbershop. Committed to the clippers, but turned off by the old-school trimming trade and tired of the pretentious posturing of those new Gentleman’s Clubs groomers, we offer an invigorating alternative to typical barber cuts.",
    lat:                "51.5261112",
    lng:                "-0.109289",
    otherServices:      "Beard and Moustache Shaping"
  },
  {
    name:               "Nomad Barber",
    website:            "http://nomadbarber.com/",
    image:              "Nomad Barber LDN is an award winning barbershop located in the heart of London's famous east end. We opened in october 2014 and have become one of the most famous barbershops in the global barbering community, with customers from all over the world coming to visit on a daily basis.",
    vibe:               "Insanely cool plus the staff are full of amazing stories!",
    description:        "Nomad Barber LDN is an award winning barbershop located in the heart of London's famous east end. We opened in october 2014 and have become one of the most famous barbershops in the global barbering community, with customers from all over the world coming to visit on a daily basis.",
    lat:                "51.5203599",
    lng:                "-0.0716388",
    otherServices:      "Shave, Beard and Moustache Shaping"
  }
];

barbers.forEach(barber => Barber.create(barber, (err, barber) => console.log(`${barber.name} was saved.`)));
