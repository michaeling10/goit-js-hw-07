"use strict";
import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryItemElements = [];

galleryItems.forEach((item) => {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = item.original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.title = galleryImage.alt;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);
  galleryItemElements.push(galleryItem);
});

galleryContainer.append(...galleryItemElements);

function handleKeyDown(e, instance) {
  if (e.key === "Escape") {
    instance.close();
    document.removeEventListener("keydown", handleKeyDown);
  }
}

const lightbox = new SimpleLightbox(".gallery a", {
  onShow: (instance) => {
    document.addEventListener("keydown", (e) => handleKeyDown(e, instance));
  },
  captionDelay: 250,
});

console.log(galleryItems);
