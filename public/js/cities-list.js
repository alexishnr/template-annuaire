var cities = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];
var regions = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];

// Create a list item for each city
// and append it to the list
cities.forEach(function (city) {
  let div = document.createElement('div');
  div.id = 'top-list';
  div.style="display: flex; flex-direction: column; justify-content: flex-start;";
  document.getElementById('div-list').appendChild(div);
  let h2 = document.createElement('h3');
  h2.id = 'region';
  h2.innerHTML = city;
  h2.style = "text-align:left;margin-top:50px; color:#697891; font-family:Raleway,sans-serif; font-size:22px; font-weight:800";
  div.appendChild(h2);
  let span = document.createElement('span');
  span.id = 'span-city';
  span.style = 'width:15%';

  span.setAttribute("class", "section-separator fl-sec-sep;");
  div.appendChild(span);
  cities.forEach(function (city) {
    let li = document.createElement('li');
    li.id = 'li-city';
    li.style = "margin-bottom: 10px";
    li.setAttribute("class", "clearfix;");
    let div2 = document.createElement('div');
    div2.id = 'div-city';
    div2.style = "text-align:left";
    div2.setAttribute("class", "widget-posts-descr;");
    li.appendChild(div2);
    let a = document.createElement('a');
    a.id = 'a-city';
    a.style = "color:#697891; font-weight:500"
    a.innerHTML = city;
    div2.appendChild(a);
    document.getElementById('div-list').appendChild(li);
  });
  let div3 = document.createElement('div');
  div3.id = 'div-see';
  div3.style = "width:100%; display:flex; justify-content:flex-start; margin-top:2Opx"
  document.getElementById('div-list').appendChild(div3);
  let a = document.createElement('a');
  a.id = 'a-see';
  a.style = "color:#697891; font-weight:500;"
  a.innerHTML = "Voir plus";
  div3.appendChild(a);
});
