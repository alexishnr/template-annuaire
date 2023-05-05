var slug = require("slug");

module.exports = citiesToExport = [];

let cities = [
  {
    city: "Barcelona",
  },
  { city: "Madrid" },
  { city: "Valencia" },
  { city: "Sevilla" },
  { city: "Zaragoza" },
  { city: "Málaga" },
  { city: "Murcia" },
  { city: "Palma de Mallorca" },
  { city: "Las Palmas de Gran Canaria" },
  { city: "Bilbao" },
  { city: "Alicante" },
  { city: "Córdoba" },
  { city: "Valladolid" },
  { city: "Vigo" },
  { city: "Gijón" },
  { city: "Hospitalet de Llobregat" },
  { city: "Vitoria" },
  { city: "La Coruña" },
  { city: "Elche" },
  { city: "Granada" },
];

cities.forEach((element) => {
  citiesToExport.push({ city: element.city, slug: slug(element.city) });
});
