var slug = require('slug');

module.exports  = citiesBelgiumToExport= [];

let cities = ["Anderlecht", "Auderghem", "Berchem-Sainte-Agathe", "Bruxelles", "Etterbeek", "Evere", "Forest", "Ganshoren", "Ixelles", "Jette", "Koekelberg", "Molenbeek-Saint-Jean", "Saint-Gilles", "Saint-Josse-ten-Noode", "Schaerbeek", "Uccle", "Watermael-Boitsfort", "Woluwe-Saint-Lambert", "Woluwe-Saint-Pierre"
];


cities.forEach(element => {
    citiesBelgiumToExport.push({ "city" : element, "slug": slug(element)})
});

