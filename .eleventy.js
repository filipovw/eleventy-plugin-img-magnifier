export default function (eleventyConfig) {
  eleventyConfig.addPlugin(function imgMagnifier(eleventyConfig) {
    eleventyConfig.addShortcode("imgmagnifier", function () {
      return `
              <style>
                img {
                  cursor: zoom-in;
                }
                /* Lightbox dialog open state */
                dialog.img-magnifier-modal[open] {
                  animation: open 0.2s ease-out forwards;
                  opacity: 1;
                  padding: 0;
                  margin-inline: auto;
                  margin-block: auto;
                  border: none;
                  width: 80vw;
                  background: none;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                dialog.img-magnifier-modal img {
                  margin: 0 auto !important;
                  border-radius: 0 !important;
                  max-width: 100%;
                  max-height: 80vh;
                  width: 100%;
                  height: auto;
                  display: block;
                  object-fit: contain;
                }
                @media (max-width: 1000px) {
                  dialog.img-magnifier-modal {
                    width: 90vw;
                  }
                }
                /* Modal backdrop */
                dialog::backdrop {
                  background-color: rgba(0, 0, 0, 0.3);
                  backdrop-filter: blur(2px);
                  transition: backdrop-filter 0.2s, background-color 0.2s;
                }
                /* Navigation container */
                .img-nav-container {
                  position: relative;
                  width: 100%;
                }
                /* Navigation buttons */
                .img-nav-btn {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  background: rgba(0, 0, 0, 0.5);
                  color: #fff;
                  border: none;
                  padding: 0.5em 0.8em;
                  font-size: 1.5em;
                  cursor: pointer;
                }
                .img-nav-prev {
                  left: 10px;
                }
                .img-nav-next {
                  right: 10px;
                }
                @keyframes open {
                  from { opacity: 0; }
                  to   { opacity: 1; }
                }
              </style>
              <script defer>
              document.addEventListener('DOMContentLoaded', () => {
                // Select only images within elements that have the class "gallery-image"
                // (Make sure you add that class to the images you want to include in the gallery.)
                const galleryImgs = Array.from(document.querySelectorAll('.gallery-image img'));

                galleryImgs.forEach((img, index) => {
                  img.addEventListener('click', () => {
                    // Create the dialog/modal element and add a custom class for styling.
                    const dialog = document.createElement('dialog');
                    dialog.classList.add('img-magnifier-modal');

                    // Create a container that will hold the image and navigation buttons.
                    const container = document.createElement('div');
                    container.className = 'img-nav-container';

                    // Clone the clicked image.
                    const newImg = img.cloneNode();
                    newImg.classList.add('magnified-image');

                    // Create navigation buttons.
                    const prevBtn = document.createElement('button');
                    prevBtn.type = 'button';
                    prevBtn.className = 'img-nav-btn img-nav-prev';
                    prevBtn.setAttribute('aria-label', 'Previous image');
                    prevBtn.innerHTML = '&#9664;'; // left arrow

                    const nextBtn = document.createElement('button');
                    nextBtn.type = 'button';
                    nextBtn.className = 'img-nav-btn img-nav-next';
                    nextBtn.setAttribute('aria-label', 'Next image');
                    nextBtn.innerHTML = '&#9654;'; // right arrow

                    // Append navigation buttons and the image into the container.
                    container.appendChild(prevBtn);
                    container.appendChild(newImg);
                    container.appendChild(nextBtn);

                    // Append the container to the dialog.
                    dialog.appendChild(container);

                    // Append the dialog to the body.
                    document.body.appendChild(dialog);

                    // Show the modal dialog.
                    dialog.showModal();

                    // Keep track of the current image index.
                    let currentIndex = index;

                    // Helper function to update the modal image.
                    function updateImage(newIndex) {
                      if (newIndex < 0 || newIndex >= galleryImgs.length) return;
                      currentIndex = newIndex;
                      newImg.src = galleryImgs[currentIndex].src;
                      newImg.alt = galleryImgs[currentIndex].alt;
                    }

                    // Attach event listeners to the navigation buttons.
                    prevBtn.addEventListener('click', (e) => {
                      e.stopPropagation();
                      updateImage(currentIndex - 1);
                    });

                    nextBtn.addEventListener('click', (e) => {
                      e.stopPropagation();
                      updateImage(currentIndex + 1);
                    });

                    // Close the modal when clicking on the backdrop.
                    dialog.addEventListener('click', (event) => {
                      if (event.target === dialog) {
                        dialog.close();
                        dialog.remove();
                      }
                    });
                  });
                });
              });
              </script>
            `;
    });
  });
}
