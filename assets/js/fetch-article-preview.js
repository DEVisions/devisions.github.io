const links = [
  // Add more links here
  "https://cuadernosdeseguridad.com/2023/05/entrevista-alessandro-albani/",
  "https://labs.yarix.com/2023/02/siri-wi400-xss-on-login-page-cve-2022-48111",
];

const apiKey = "c24f1613327b2bf138422f2cb626abac";
const apiUrl = "https://api.linkpreview.net";
const previewWordLimit = 30;

function createCard(link) {
  const card = document.createElement("a");
  card.classList.add("column", "is-one-third-desktop", "is-half-tablet");

  const cardContent = document.createElement("div");
  cardContent.classList.add("box");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image");

  const image = document.createElement("img");
  image.id = "image_" + link;
  image.src = "";

  const content = document.createElement("div");

  const title = document.createElement("div");
  title.id = "title_" + link;
  title.classList.add("has-text-weight-bold");

  const description = document.createElement("div");
  description.id = "description_" + link;
  description.classList.add("mt-2");

  const url = document.createElement("div");
  url.id = "url_" + link;
  url.classList.add("mt-2", "is-size-7", "is-italic");

  imageContainer.appendChild(image);
  cardContent.appendChild(imageContainer);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(url);
  cardContent.appendChild(content);
  card.appendChild(cardContent);

  return card;
}

function fetchLinkPreview(link) {
  const data = {
    key: apiKey,
    q: link,
  };

  fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      document.getElementById("title_" + link).innerHTML = response.title;
      document.getElementById("url_" + link).innerHTML = response.url;

      const description = response.description;
      const truncatedDescription = truncateText(description, previewWordLimit);
      document.getElementById("description_" + link).innerHTML =
        truncatedDescription;

      const image = document.getElementById("image_" + link);
      image.src = response.image;
      image.onload = function () {
        resizeImages();
      };
    });
}

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  const truncatedWords = words.slice(0, wordLimit);

  let truncatedText = truncatedWords.join(" ");

  // Add ellipsis if truncated text does not end with punctuation
  if (!/[.,;:!?]$/.test(truncatedText)) {
    truncatedText += "...";
  }

  return truncatedText;
}

function resizeImages() {
  const images = Array.from(document.querySelectorAll("img"));
  const maxWidth = Math.max(...images.map((img) => img.width));

  images.forEach((img) => {
    img.style.width = `${maxWidth}px`;
  });
}

window.onload = function () {
  const cardsContainer = document.getElementById("cardsContainer");

  links.forEach((link) => {
    const card = createCard(link);
    card.href = link;
    card.target = "_blank";
    fetchLinkPreview(link);
    cardsContainer.appendChild(card);
  });
};
