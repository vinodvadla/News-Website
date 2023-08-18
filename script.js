let url = "https://newsapi.org/v2/everything?q=";
let apiKey = "3a0d27812450426cb47cbbeb83eab506";
window.addEventListener("load", () => {
    fetchNews("India");
});
async function fetchNews(query) {
    let res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    let data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    let cardContainer = document.getElementById("container");
    let cardtemplate = document.getElementById("card-Template");
    cardContainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cloneCard = cardtemplate.content.cloneNode(true);
        setCardData(cloneCard, article);
        cardContainer.appendChild(cloneCard);
    });
}
function setCardData(card, article) {
    let image = card.querySelector("#news-img");
    let title = card.querySelector("#news-title");
    let details = card.querySelector("#news-details");
    image.src = article.urlToImage;
    title.innerHTML = article.title;
    details.innerHTML = article.description;

    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
currSeletedNav = null;
function navigate(id) {
    let navitem = document.getElementById(id);
    fetchNews(id);
    currSeletedNav?.classList.remove("active");
    currSeletedNav = navitem;
    currSeletedNav.classList.add("active");
}
let input = document.getElementById("news-Input");
let btn = document.getElementById("search-btn");
btn.addEventListener("click", () => {
    if (!input.value) return;
    currSeletedNav.classList.remove("active");
    fetchNews(input.value);
});

function handleclick() {
    window.location.reload();
}
let cancel = document.getElementById("cancel");
let layer = document.getElementById("layer")
cancel.addEventListener("click", () => {
    layer.style.display = "none";
})
let menu = document.getElementById("menu")
menu.addEventListener("click", () => {
    layer.style.display = "block";
})