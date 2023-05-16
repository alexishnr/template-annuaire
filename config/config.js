const configProject = {
  professionnelsToFetch: "medecins",
  professionnel: "medecin",
  professionnelUrl: "medecin-generaliste",
  updateProfessionnel: "updateMedecin",
  createProfessionnelReview: {
    input: "createCommentairesMedecinInput",
    review: "createCommentairesMedecin",
    fetch: "commentairesMedecin",
  },
  configProfessionnel: "configMedecin",
  isBannerDisplayed: false,
  host: "https://h2h-app-4el6l.ondigitalocean.app",
  auth: {
    identifier: process.env.SECRET_USER,
    password: process.env.SECRET_PWD,
  },
  website: {
    url: "N/A",
    name: "N/A",
    wpUrl: "N/A",
    bg: "",
  },
  professionnelFormatted: {
    capitalized: "Médecin généraliste",
    lowerCase: "médecin généraliste",
    pluralCapitalized: "Médecins généraliste",
    pluralLowerCase: "médecins généraliste",
    slugUrl: "medecin-generaliste",
    pluralSlug: "medecins-generaliste",
  },
};

const configWP = {
  host: "N/A",
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
// region = <%= region %>
// article title = <%= articleTitle %>
const metas = {
  index: {
    title: `${professionnel.pluralCapitalized}  & ${professionnel.pluralLowerCase} de garde | Rdv Aujourd'hui 24h/24 & 7j/7`,
    description: `${professionnel.lowerCase}, trouvez un ${professionnel.lowerCase} et un ${professionnel.lowerCase} de garde 24h/24 & 7j/7 près de chez vous. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  listing: {
    title: `${professionnel.pluralCapitalized} à <%= place %>, Rdv Aujourd'hui 24h/24 & 7j/7`,
    description: `Vous cherchez un ${professionnel.lowerCase} à <%= place %>, prenez rendez-vous gratuitement en ligne avec un ${professionnel.lowerCase} près de chez vous 24/24 & 7/7.`,
  },
  details: {
    title: `${professionnel.capitalized} <%= company %> | Prendre Rdv Aujourd'hui.`,
    description: `Trouvez un rdv avec le ${professionnel.lowerCase}: <%= company %>, <%= address %> pour un rendez-vous.`,
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
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  blogMutuelle: {
    title: `${configProject.website.name} | Blog`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  blogDetails: {
    title: ` <%= articleTitle %>`,
    description: `<%= articleTitle %> : Tous nos conseils.`,
  },
  allRegions: {
    title: `${professionnel.pluralCapitalized} en France | ${configProject.website.name}`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  contact: {
    title: `${configProject.website.name} | Contact`,
    description: `${configProject.website.name} | Trouvez les meilleurs ${professionnel.pluralLowerCase} près de chez vous. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
  allCities: {
    title: `${configProject.website.name} | Villes`,
    description: `Trouvez les meilleurs ${professionnel.pluralLowerCase} dans la région de <%= region %>. Prenez rendez-vous gratuitement en ligne en quelques clics.`,
  },
};

module.exports = { configProject, configWP, metas };
