const API_KEY = "e10f4c1131824cf2b90eda4ea6b46fd2";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
 
  console.log(data);

  bindData(data.articles);
}
function reload() {
  window.location.reload();
}
function bindData(articles) {
  const cardContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newImg = cardClone.querySelector("#news-img");
  const newTitle = cardClone.querySelector("#news-title");
  const newSource = cardClone.querySelector("#news-source");
  const newDesc = cardClone.querySelector("#news-desc");
  newImg.src = article.urlToImage;
  newTitle.innerHTML = article.title;
  newDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Kolkata",
  });
  newSource.innerHTML = `${article.source.name} • ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  // id is json object passed in onclick function
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
