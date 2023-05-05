var slug = require('slug')

module.exports  = citiesToExport= [];

let cities = [
	{
		"city": "Paris"
	},
	{
		"city": "Marseille"
	},
	{
		"city": "Lyon"
	},
	{
		"city": "Toulouse"
	},
	{
		"city": "Nice"
	},
	{
		"city": "Nantes"
	},
	{
		"city": "Strasbourg"
	},
	{
		"city": "Montpellier"
	},
	{
		"city": "Bordeaux"
	},
	{
		"city": "Rennes"
	},
	{
		"city": "Le Havre"
	},
	{
		"city": "Reims"
	},
	{
		"city": "Lille"
	},
	{
		"city": "Saint-Étienne"
	},
	{
		"city": "Toulon"
	},
	{
		"city": "Grenoble"
	},
	{
		"city": "Angers"
	},
	{
		"city": "Dijon"
	},
	{
		"city": "Brest"
	},
	{
		"city": "Le Mans"
	},
	{
		"city": "Clermont-Ferrand"
	},
	{
		"city": "Amiens"
	},
	{
		"city": "Aix-en-Provence"
	},
	{
		"city": "Limoges"
	},
	{
		"city": "Nîmes"
	},
	{
		"city": "Tours"
	},
	{
		"city": "Saint-Denis"
	},
	{
		"city": "Metz"
	}
]


cities.forEach(element => {
    citiesToExport.push({ "city" : element.city, "slug": slug(element.city)})
});

