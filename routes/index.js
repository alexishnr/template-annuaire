// MODULES //
const express = require("express");
const mCache = require("memory-cache");
const router = express.Router();
let slug = require("slug");
const moment = require("moment");
const fetch = require("node-fetch");
const axios = require("axios");
let clean = require("xss-clean/lib/xss").clean;
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// CONFIG //
const projectConfig = require("../config/config").configProject;
const configWP = require("../config/config").configWP;
const professionnelsToFetch = projectConfig.professionnelsToFetch;
const professionnel = projectConfig.professionnel;
const updateProfessionnel = projectConfig.updateProfessionnel;
const createProfessionnelReview = projectConfig.createProfessionnelReview;
const wpApi = configWP.host;
const isBannerDisplayed = projectConfig.isBannerDisplayed;
const host = projectConfig.host;
const auth = projectConfig.auth;
const configProfessionnel = projectConfig.configProfessionnel;
const professionnelFormatted = projectConfig.professionnelFormatted;
const website = projectConfig.website;

// FILES //
let dataArrondissements = require("../public/js/arrondissementsList");
let citiesList = require("../public/js/citiesList");
let forbiddenlinks = require("../public/js/forbiddenlinks.js");

// FUNCTIONS //
function decodeEntities(encodedString) {
  let translate_re = /&(nbsp|amp|quot|lt|gt|rsquo);/g;
  let translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
    rsquo: "'",
  };
  return encodedString
    .replace(translate_re, function (entity) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (numStr) {
      let num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

// REDIRECT LINKS
let r = function (req, res) {
  res.redirect(410, "/error");
};
let routes = forbiddenlinks;
for (let i in routes) router.all(routes[i], r);

// ROUTES //

router.get("/", function (req, res) {
  let key = req.originalUrl || req.url;
  /*** @type {Object|null} cacheBody*/
  let cacheBody = mCache.get(key); // mise en place d'un cache
  if (cacheBody === null) {
    fetch(
      wpApi +
        `/wp-json/wp/v2/posts?categories=${configWP.categoriesIndex}&per_page=100`,
      {
        agent,
      }
    )
      .then((resp) => {
        const body = resp.text();
        return body;
      })
      .then((respText) => {
        res.render("index", {
          resultBlog: JSON.parse(decodeEntities(respText)),
          citiesList: citiesList,
          isBannerDisplayed,
          professionnelFormatted,
          website,
        });
      })
      .catch((e) => {
        res.render("index", {
          resultBlog: [],
          citiesList: citiesList,
          isBannerDisplayed,
          professionnelFormatted,
          website,
        });
      });
  } else {
    res.render("index", {
      resultBlog: JSON.parse(decodeEntities(respText)),
      citiesList: citiesList,
      isBannerDisplayed,
      professionnelFormatted,
      website,
    });
  }
});

router.post("/recherche", function (req, res) {
  const PlaceToSearch = slug(req.body.PlaceToSearch);
  res.redirect(`/${professionnel}/${PlaceToSearch}`);
});

router.get(`/:${professionnel}/:PlaceToSearch`, function (req, res) {
  const PlaceToSearch = clean(req.params.PlaceToSearch);
  let City;

  let citiesWSpaces = ["le-havre", "le-mans"];
  City = citiesWSpaces.includes(PlaceToSearch)
    ? PlaceToSearch.replace("-", " ")
    : PlaceToSearch;
  fetch(host + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ${professionnelsToFetch}($where: JSON)
             {
              ${professionnelsToFetch}(where: $where)
            {
              Company
              DoctolibName
              Job
              Address
              City
              Rating
              ReviewsNumber
              Url
              slugCity
              Avatar {
                formats
                url
              }
            }
        }`,
      variables: {
        where: {
          Search_places_contains: PlaceToSearch,
          isDisplayed: true,
        },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseAsJson) => {
      let results = responseAsJson.data[professionnelsToFetch];
      let arrondissements = [];
      if (results.length > 0) {
        if (PlaceToSearch === "paris")
          arrondissements = dataArrondissements.paris;
        else if (PlaceToSearch === "marseille")
          arrondissements = dataArrondissements.marseille;
        else if (PlaceToSearch === "lyon")
          arrondissements = dataArrondissements.lyon;
      } else arrondissements = [];
      let resultsData = results.sort(
        (a, b) =>
          b.Rating - a.Rating ||
          b.ReviewsNumber.toString().localeCompare(a.ReviewsNumber.toString())
      );
      res.render("listing", {
        results: resultsData,
        bestResults: resultsData.splice(0, 6),
        place: City.charAt(0).toUpperCase() + City.slice(1),
        data: null,
        arrondissements: arrondissements,
        citiesList: citiesList,
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
    });
});

router.get(`/:${professionnel}/:ville/:name`, function (req, res) {
  const id = req.params.name;

  fetch(host + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ${professionnelsToFetch}($where: JSON)
          {
           ${professionnelsToFetch} (where: $where){
             isDisplayed
             Company
             Address
             Phone
             Opening_Hours
             Email
             City
             Twitter
             Instagram
             Facebook
             Linkedin
             Url
             PostCode
             Uid
             Country
             slugCity
             Department
             Services
             Description
             DoctolibName
             Job
             More_informations
             MeansOfPayment
             Transports
             Parkings
             Presentation
             Languages
             Qualifications
             Prices
             Refunds
             Associations
             PracticalInfos
             Prizes
             Experiences
             Services
             Works
             Avatar {
               formats
               url
             }
             Rating
             TotalRating
             id
             Website
             Opening_Hours
             ReviewsNumber
             Search_places
           }

        }`,
      variables: {
        where: {
          Url: id,
        },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseAsJson) => {
      fetch(host + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query ${professionnelsToFetch}($where: JSON)
                   {
                    ${professionnelsToFetch}(where: $where , sort:"Rating:desc", limit:20)
                  {
                    isDisplayed
                    Company
                    Address
                    City
                    DoctolibName
                    Rating
                    slugCity
                    ReviewsNumber
                    Url
                    Avatar {
                      formats
                      url
                    }
                  }
              }`,
          variables: {
            where: {
              isDisplayed: true,
              PostCode: responseAsJson.data[professionnelsToFetch][0]?.PostCode,
            },
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseAsJson1) => {
          let reviews = [];
          let arrondissements = [];
          let resultsData = responseAsJson.data[professionnelsToFetch]
            ? responseAsJson.data[professionnelsToFetch]
            : [];
          if (resultsData.length > 0) {
            if (resultsData[0].City === "Paris")
              arrondissements = dataArrondissements.paris;
            else if (resultsData[0].City === "Marseille")
              arrondissements = dataArrondissements.marseille;
            else if (resultsData[0].City === "Lyon")
              arrondissements = dataArrondissements.lyon;
            else arrondissements = [];
          }
          if (responseAsJson.data[professionnelsToFetch].length > 0) {
            if (req.params.ville !== resultsData[0].slugCity)
              res.redirect(
                `/${professionnel}/${resultsData[0].slugCity}/${resultsData[0].Url}`
              );
            let bestResultsData = responseAsJson1.data[professionnelsToFetch]
              .splice(0, 6)
              .sort(
                (a, b) =>
                  b.Rating - a.Rating ||
                  b.ReviewsNumber.toString().localeCompare(
                    a.ReviewsNumber.toString()
                  )
              );

            let data = responseAsJson.data[professionnelsToFetch][0];
            data.Company =
              data?.DoctolibName && data?.Company.length < 50
                ? data?.DoctolibName
                : data?.Company;

            let sectionRefundsAndServices =
              data?.Refunds?.length > 0 ||
              data?.Services?.length > 0 ||
              (data?.MeansOfPayment && data?.MeansOfPayment !== "");

            let sectionAbout =
              data?.Formations?.length > 0 ||
              data?.OtherFormations?.length > 0 ||
              data?.Experiences?.length > 0 ||
              data?.Qualifications?.length > 0 ||
              data?.Associations?.length > 0 ||
              data?.Prizes?.length > 0 ||
              data?.Works?.length > 0 ||
              // (data?.Presentation !== null &&
              //   data?.Presentation !== "") ||
              (data?.Languages !== null && data?.Languages !== "");

            return res.render("details", {
              data: data,
              products: responseAsJson.data.shoppingveterinaires,
              reviews,
              sections: { sectionRefundsAndServices, sectionAbout },
              arrondissements,
              bestResults: bestResultsData,
              slugCityToRender: resultsData[0].SlugCity,
              isBannerDisplayed,
              professionnelFormatted,
              website,
            });
          } else {
            res.redirect("/error");
          }
        });
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get(`/:${professionnel}/:ville/:name/avis/:error?`, function (req, res) {
  const id = req.params.name;
  const specificList = [];

  fetch(host + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ${professionnelsToFetch}($where: JSON)
                {
                ${professionnelsToFetch} (where: $where){
                  isDisplayed
                  Company
                  Address
                  Phone
                  Opening_Hours
                  Email
                  City
                  Url
                  slugCity
                  Uid
                  DoctolibName
                  Job
                  Country
                  Department
                  Services
                  Description
                  Avatar {
                    formats
                    url
                  }
                  Rating
                  TotalRating
                  id
                  Website
                  Opening_Hours
                  PostCode
                  ReviewsNumber
                  Search_places
                  Reviews (sort:"Publishing_date:asc"){
                    id
                    IP
                    Rating
                    Publishing_date
                    Author
                    Text
                  }
                }
              }`,
      variables: {
        where: {
          Url: id,
        },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseAsJson) => {
      fetch(host + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query ${professionnelsToFetch}($where: JSON)
                   {
                    ${professionnelsToFetch}(where: $where , sort:"Rating:desc", limit:20)
                  {
                    isDisplayed
                    Company
                    Address
                    City
                    DoctolibName
                    Rating
                    slugCity
                    ReviewsNumber
                    Url
                    Avatar {
                      formats
                      url
                    }
                  }
              }`,
          variables: {
            where: {
              PostCode: responseAsJson.data[professionnelsToFetch][0]?.PostCode,
            },
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseAsJson1) => {
          let reviews = [];
          let ip = [];
          let arrondissements = [];
          let resultsData = responseAsJson.data[professionnelsToFetch]
            ? responseAsJson.data[professionnelsToFetch]
            : [];
          let data = resultsData[0];

          if (resultsData.length > 0) {
            if (data.City === "Paris")
              arrondissements = dataArrondissements.paris;
            else if (data.City === "Marseille")
              arrondissements = dataArrondissements.marseille;
            else if (data.City === "Lyon")
              arrondissements = dataArrondissements.lyon;
            else arrondissements = [];
          }
          if (resultsData.length > 0) {
            if (req.params.ville !== data.slugCity)
              res.redirect(`/${professionnel}/${data.slugCity}/${data.Url}`);
            data.Reviews.forEach((item, i) => {
              reviews.push(item.id);
              if (item.IP) ip.push(item.IP);
            });
            let bestResultsData = responseAsJson1.data[professionnelsToFetch]
              .splice(0, 6)
              .sort(
                (a, b) =>
                  b.Rating - a.Rating ||
                  b.ReviewsNumber.toString().localeCompare(
                    a.ReviewsNumber.toString()
                  )
              );
            data.Company =
              data?.DoctolibName && data?.Company.length < 50
                ? data?.DoctolibName
                : data?.Company;
            res.render("reviews", {
              data: data,
              slugCityToRender: data.SlugCity,
              products: [],
              reviews,
              arrondissements,
              ip,
              error: req.params.error,
              bestResults: bestResultsData,
              isBannerDisplayed,
              professionnelFormatted,
              website,
            });
          } else {
            res.redirect("/error");
          }
        });
    })
    .catch((e) => {
      console.error(e);
    });
});

router.post("/add-review", function (req, res) {
  let data = clean(req.body);
  const ip = data.Email;
  const avoidUrl =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  if (!data.IP.includes(ip)) {
    if (!avoidUrl.test(data?.ReviewText)) {
      let dateString = moment().format("YYYY-MM-DD");
      // Fetch Strapi to get Reviews from Professional table
      axios
        .post(host + "/auth/local", auth)
        .then((response) => {
          const token = `Bearer ${response.data.jwt}`;
          fetch(host + "/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              query: `mutation ${createProfessionnelReview.input} ($input: ${createProfessionnelReview.input}!) {
                ${createProfessionnelReview.review} (input: $input) {
                  ${createProfessionnelReview.fetch} {
                            id
                          }
                        }
                      }`,
              variables: {
                input: {
                  data: {
                    Author: data.Name,
                    Text: data.ReviewText,
                    Rating: Number(data.rgcl),
                    ProfessionnelUid: data.Uid,
                    Publishing_date: dateString,
                    IP: ip,
                  },
                },
              },
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((responseAsJson) => {
              // Reiceve past reviews from frontend, push the new one and calculate the new rating
              let reviews = [];
              data.PastReviews.split(",").forEach((item, i) => {
                if (item !== "") {
                  reviews.push(item);
                }
              });
              reviews.push(
                responseAsJson.data[createProfessionnelReview.review][
                  createProfessionnelReview.fetch
                ].id
              );
              let newRating =
                (Number(data.TotalRating) + Number(data.rgcl)) /
                (Number(data.ReviewsNumber) + 1);
              let TotalRating = Number(data.TotalRating) + Number(data.rgcl);
              // Push the new array and update the rating
              fetch(host + "/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  query: `mutation {
                      ${updateProfessionnel}(input: {
                        where: { id: ${data.professionnelId} }
                        data: {
                          Rating:${newRating}, Reviews:${JSON.stringify(
                    reviews
                  )}, ReviewsNumber: ${
                    Number(data.ReviewsNumber) + 1
                  }, TotalRating : ${TotalRating}
                        }
                        }) {
                          veterinaire {
                            id
                          }
                        }
                      }`,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then(() => {
                  res.redirect(
                    `/${professionnel}/${data.slugCity}/${data.Url}/avis`
                  );
                })
                .catch((e) => {
                  console.error(e);
                });
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((error) => {
          console.log(error.response.data.message[0]);
        });
    } else {
      res.redirect(
        `/${professionnel}/${data.slugCity}/${data.Url}/avis/invalid`
      );
    }
  } else {
    res.redirect(
      `/${professionnel}/${data.slugCity}/${data.Url}/avis/duplicate-review`
    );
  }
});

router.get("/blog/mutuelle", function (req, res) {
  fetch(
    wpApi +
      `/wp-json/wp/v2/posts?categories=${configWP.categoriesIndex}&per_page=100`,
    { agent }
  )
    .then((resp) => {
      const body = resp.text();
      return body;
    })
    .then((respText) => {
      res.render("blog-mutuelle", {
        resultBlog: JSON.parse(decodeEntities(respText)),
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
    })
    .catch((e) => {
      res.render("blog-mutuelle", {
        resultBlog: [],
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
      console.error(e);
    });
});

router.get("/blog/:name", function (req, res) {
  fetch(wpApi + "/wp-json/wp/v2/posts?slug=" + req.params.name, { agent })
    .then((resp) => {
      const body = resp.text();
      return body;
    })
    .then((respText) => {
      let category = JSON.parse(respText)[0]?.categories[1]
        ? JSON.parse(respText)[0]?.categories[1]
        : JSON.parse(respText)[0]?.categories[0];
      fetch(
        wpApi + "/wp-json/wp/v2/posts?categories=" + category + "&per_page=4",
        {
          agent,
        }
      )
        .then((resp) => {
          const body = resp.text();
          return body;
        })
        .then((respText1) => {
          fetch(wpApi + "/wp-json/wp/v2/posts?slug=" + req.params.name, {
            agent,
          })
            .then((resp) => {
              const body = resp.text();
              return body;
            })
            .then((respText) => {
              let responseArticle = JSON.parse(decodeEntities(respText))[0];
              let alsoLike = JSON.parse(decodeEntities(respText1));
              res.render("blog-details", {
                data: responseArticle,
                author: responseArticle?.authors,
                alsoLike: alsoLike?.filter(
                  (item) => item.id !== responseArticle?.id
                ),
                isBannerDisplayed,
                professionnelFormatted,
                website,
              });
            });
        });
    })
    .catch((e) => {
      console.error(e);
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get("/blog", function (req, res) {
  fetch(wpApi + "/wp-json/wp/v2/posts?per_page=100", { agent })
    .then((resp) => {
      const body = resp.text();
      return body;
    })
    .then((respText) => {
      res.render("blog", {
        resultBlog: JSON.parse(decodeEntities(respText)),
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
    })
    .catch((e) => {
      res.render("blog", {
        resultBlog: [],
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
      console.error(e);
    });
});

router.get("/mutuelle", function (req, res) {
  fetch(
    wpApi +
      `/wp-json/wp/v2/posts?categories=${configWP.categoriesIndex}&per_page=100`,
    { agent }
  )
    .then((resp) => {
      const body = resp.text();
      return body;
    })
    .then((respText) => {
      res.render("mutuelle", {
        resultBlog: JSON.parse(decodeEntities(respText)),
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
    })
    .catch((e) => {
      res.render("mutuelle", {
        resultBlog: [],
        isBannerDisplayed,
        professionnelFormatted,
        website,
      });
      console.error(e);
    });
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.get("/mentionlegales", function (req, res) {
  res.render("mentionlegale");
});

router.get("/reseaux", function (req, res) {
  res.render("reseaux");
});

router.get("/regions", function (req, res) {
  let regions = [
    { Name: "Bourgogne-Franche-Comté", Url: "bourgogne-franche-comte" },
    { Name: "Grand-Est", Url: "grand-est" },
    { Name: "Normandie", Url: "normandie" },
    { Name: "Corse", Url: "corse" },
    { Name: "Bretagne", Url: "bretagne" },
    { Name: "Occitanie", Url: "occitanie" },
    { Name: "Provence-Alpes-Côte d'Azur", Url: "provence-alpes-cote-d-azur" },
    { Name: "Hauts-de-France", Url: "hauts-de-france" },
    { Name: "Centre-Val de Loire", Url: "centre-val-de-loire" },
    { Name: "Auvergne-Rhône-Alpes", Url: "auvergne-rhone-alpes" },
    { Name: "Nouvelle-Aquitaine", Url: "nouvelle-aquitaine" },
    { Name: "Pays de la Loire", Url: "pays-de-la-loire" },
    { Name: "Île-de-France", Url: "ile-de-france" },
    { Name: "Guadeloupe", Url: "guadeloupe" },
    { Name: "Martinique", Url: "martinique" },
    { Name: "La Réunion", Url: "la-reunion" },
    { Name: "Guyane", Url: "guyane" },
  ];
  res.render("all-regions", { regions, isBannerDisplayed });
});

router.get("/regions/:region", function (req, res) {
  let cities = [];
  let region = [];

  fetch(host + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
          ${configProfessionnel} {
            Cities
            Regions
          }
      }`,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseAsJson) => {
      responseAsJson.data[configProfessionnel].Cities.forEach((item, i) => {
        if (item.region === req.params.region) {
          cities.push(item);
        }
      });
      responseAsJson.data[configProfessionnel].Regions.forEach((item, i) => {
        if (item.Url === req.params.region) {
          region.push(item);
        }
      });
      res.render("cities-details", {
        cities,
        region: region[0],
        isBannerDisplayed,
      });
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get("/error", function (req, res) {
  res.render("error", { isBannerDisplayed });
});

module.exports = router;
