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
  galleryImage.setAttribute("data-source", item.original);
  galleryImage.alt = item.description;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);
  galleryItemElements.push(galleryItem);
});

galleryContainer.append(...galleryItemElements);

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    try {
      const clickedImage = event.target;
      const source = clickedImage.getAttribute("data-source");
      const description = clickedImage.alt;

      if (source) {
        const instance = basicLightbox.create(
          `<img src="${source}" alt="${description}">`,
          {
            onShow: (instance) => {
              document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                  instance.close();
                  document.removeEventListener("keydown", handleKeyDown);
                }
              });
            },
          }
        );
        instance.show();
      } else {
        console.error("Missing data-source attribute on the clicked image");
      }
    } catch (error) {
      console.error("Error when opening the modal:", error);
    }
  }
});
console.log(galleryItems);
