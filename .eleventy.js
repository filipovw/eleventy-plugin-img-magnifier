export default function (eleventyConfig) {
  eleventyConfig.addPlugin(function imgMagnifier(eleventyConfig) {
    eleventyConfig.addShortcode("imgmagnifier", function () {
      return `
              <style>
              img {
                cursor: zoom-in;
              }
              /*   Open state of the dialog  */
              dialog[open] {
                animation: open .2s ease-out forwards;
                opacity: 1;
                padding 0;
                margin-inline: auto;
                margin-block: auto;
                border: none;
                width: 80vw;
                background: none;
                display: flex;
                justify-content: center;
                align-items: center;
                &:focus {
                  outline: none;
                }
                & img {
                  margin: 0 auto !important;
                  border-radius: 0!important;
                  max-width: 100%;
                  max-height: 80vh;
                  width: 100%;
                  height: auto;
                  display: block;
                  object-fit: contain;
                }
              }
              @media (width < 1000px) {
                dialog[open] {
                  width: 90vw;
                }
              }
              /*   Closed state of the dialog   */
              dialog {
                opacity: 0;
                align-content: center;
              }
              
              
              /*   Before-open state  */
              /* Needs to be after the previous dialog[open] rule to take effect,
                  as the specificity is the same */
              @starting-style {
                dialog[open] {
                  opacity: 0;
                }
              }
              
              @keyframes open {
                from { opacity: 0 }
                to   { opacity: 1 }
              }
              
              
              /* Transition the :backdrop when the dialog modal is promoted to the top layer */
              dialog::backdrop {
                background-color: rgb(0 0 0 / 0%);
                backdrop-filter: blur(0px);
                transition: backdrop-filter 0.2s, background-color 0.2s;
                /* Equivalent to
                transition: all .2s allow-discrete; */
              }
              
              dialog[open]::backdrop {
                background-color: rgb(0 0 0 / 30%);
                backdrop-filter: blur(2px);
              }
              
              /* This starting-style rule cannot be nested inside the above selector
              because the nesting selector cannot represent pseudo-elements. */
              
              @starting-style {
                dialog[open]::backdrop {
                  background-color: rgb(0 0 0 / 0%);
                  backdrop-filter: blur(0px);
                }
              }
              </style>
              <script defer>
              document.addEventListener('DOMContentLoaded', () => {
              let imgs = document.querySelectorAll('img')

              imgs.forEach(img => {
                  img.addEventListener('click', ()=>{
                      let parent = img.parentNode
                      let newImg = img.cloneNode()
                      let dialog = document.createElement('dialog')
                      dialog.appendChild(newImg)
                      parent.appendChild(dialog)
                      dialog.showModal()

                      dialog.addEventListener('click', (event)=>{
                          if (event.target == dialog) {
                              dialog.close();
                              dialog.remove()
                            }
                      })
                  })
              });
              })
              </script>
            `;
    });
  });
}
