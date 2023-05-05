const configProject = {
  professionnelsToFetch: "veterinaires",
  professionnel: "veterinaire",
  updateProfessionnel: "updateVeterinaire",
  createProfessionnelReview: {
    input: "createCommentairesVeterinaireInput",
    review: "createCommentairesVeterinaire",
    fetch: "commentairesVeterinaire",
  },
  configProfessionnel: "configVeterinaire",
  isBannerDisplayed: false,
  host: "https://h2h-app-4el6l.ondigitalocean.app",
  auth: {
    identifier: process.env.SECRET_USER,
    password: process.env.SECRET_PWD,
  },
  website: {
    url: "https://charliepets.com",
    name: "Charlie Pet's",
    wpUrl: "https://www.api.h2hstudioweb.com/charliepets",
  },
  professionnelFormatted: {
    capitalized: "Vétérinaire",
    lowerCase: "vétérinaire",
    pluralCapitalized: "Vétérinaires",
    pluralLowerCase: "vétérinaires",
    slug: "veterinaire",
    pluralSlug: "veterinaires",
  },
};

const configWP = {
  host: "",
  categoriesIndex: "3,5",
  categoriesBlogMutuelles: "4",
  categoriesBlog: "",
};

module.exports = { configProject, configWP };
