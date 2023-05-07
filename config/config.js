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
    bg: "",
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
  host: "https://www.api.h2hstudioweb.com/charliepets",
  categorySante: 3,
  categoryFeaturedSante: 4,
  categoryMutuelle: 3,
  categoryFeaturedMutuelle: 4,
};

const professionnel = configProject.professionnelFormatted;

// METAS HELPERS //
// address = <%= address %>
// place = <%= place %>
// company = <%= company %>
// address = <%= address %>
// article title = <%= articleTitle %>
const metas = {
  index: {
    title: `${professionnel.pluralCapitalized}  & ${professionnel.pluralLowerCase} de garde | Rdv Aujourd'hui 24h/24 & 7j/7`,
    description: `${professionnel.lowerCase}, trouvez un ${professionnel.lowerCase} et un ${professionnel.lowerCase} de garde 24h/24 & 7j/7 près de chez vous pour votre animal. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  listing: {
    title: `${professionnel.pluralCapitalized} à <%= place %>, Rdv Aujourd'hui 24h/24 & 7j/7`,
    description: `Vous cherchez un ${professionnel.lowerCase} à <%= place %>, prenez rendez-vous gratuitement en ligne avec un ${professionnel.lowerCase} près de chez vous 24/24 & 7/7.`,
  },
  details: {
    title: `${professionnel.capitalized} <%= company %> | Prendre Rdv Aujourd'hui.`,
    description: `Trouvez un rdv avec le ${professionnel.lowerCase}: <%= company %>, <%= address %> pour une consultation.`,
  },
  reviews: {
    title: `Avis des patients du ${professionnel.lowerCase} <%= company %>`,
    description: `Lire les avis du ${professionnel.lowerCase}: <%= company %>, parcourez les avis des clients afin de trouver le meilleur ${professionnel.lowerCase}.`,
  },
  mutuelle: {
    title: `${configProject.website.name} | Mutuelle`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre ${professionnel.lowerCase}. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  error: {
    title: `${configProject.website.name} Page non trouvée`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre ${professionnel.lowerCase}. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  blog: {
    title: `${configProject.website.name} | Blog`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre animal. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  blogMutuelle: {
    title: `${configProject.website.name} | Blog`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre animal. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  blogDetails: {
    title: ` <%= articleTitle %>`,
    description: `<%= articleTitle %> : Tous nos conseils pour la santé de votre animal.`,
  },
  allRegions: {
    title: `${professionnel.pluralCapitalized} en France | ${configProject.website.name}`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre animal. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  contact: {
    title: `${configProject.website.name} | Contact`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous pour votre animal. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  allCities: {
    title: `${configProject.website.name} | Villes`,
    description: `Trouvez les meilleurs ${professionnel.pluralLowerCase} dans la région de <%= region %>. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
};

module.exports = { configProject, configWP, metas };
