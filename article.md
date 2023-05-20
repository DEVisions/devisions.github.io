---
layout: page
title: Articles
---

<script src="/assets/js/fetch-article-preview.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">

<style>
    #cardsContainer {
  justify-content: center;
  align-items: flex-start; /* Align cards based on top */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Set the desired height for the images */
  overflow: hidden;
}

.image img {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>

<div class="container">
  <div id="cardsContainer" class="columns is-multiline is-centered"></div>
</div>
