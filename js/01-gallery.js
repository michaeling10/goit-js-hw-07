"use strict";

import { galleryItems } from "./gallery-items.js";

// Change code below this line

// Get the gallery container and create an empty array to store gallery items
const galleryContainer = document.querySelector(".gallery");
const galleryItemElements = [];

// Render gallery items from galleryItems data
galleryItems.forEach((item, index) => {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = item.original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = item.preview;
  galleryImage.setAttribute("data-source", item.original);
  galleryImage.alt = item.description;
  galleryImage.dataset.index = index;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);
  galleryItemElements.push(galleryItem);
});

// Append gallery items to the gallery container
galleryContainer.append(...galleryItemElements);

// Delegation to ul.gallery for handling clicks
galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    try {
      const clickedImage = event.target;
      const source = clickedImage.getAttribute("data-source");
      const description = clickedImage.alt;

      if (source) {
        // Open the modal window with BasicLightbox
        const instance = basicLightbox.create(
          `<img src="${source}" alt="${description}">`
        );
        instance.show();
      } else {
        console.error("Missing data-source attribute on the clicked image.");
      }
    } catch (error) {
      console.error("Error when opening the modal:", error);
    }
  }
});
console.log(galleryItems);
