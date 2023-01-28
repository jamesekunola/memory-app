const memoryImages = [
  "/images/ban.jpg",
  "/images/boy.jpg",
  "/images/ball.jpg",
  "/images/boy.jpg",
  "/images/ball.jpg",
  "/images/ban.jpg",
];
const cards = document.querySelectorAll(".card-img img");
const defaultImage = "/images/cover.jpg";
let score = 0;
let attempt = 0;
let selectedImg = [];
let identicalImg = [];

// randomize images
memoryImages.sort(() => Math.random() - 0.5);

window.addEventListener("DOMContentLoaded", () => {
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const clickedImgClass = card.getAttribute("class");

      //   store the src of the image clicked
      selectedImg.push({
        imgclass: clickedImgClass,
        img: memoryImages[index],
      });

      // check if the img clicked was among the previously image match
      if (identicalImg.includes(selectedImg[0].img)) {
        selectedImg = [];
        return;
      }
      card.src = memoryImages[index];
      compareSelectedImages();
    });
  });
});

function compareSelectedImages() {
  if (selectedImg.length == 2) {
    // check if an img clicked twice
    if (selectedImg[0].imgclass === selectedImg[1].imgclass) {
      selectedImg.pop();
      return;
    }

    // check if the img clicked was among the previously images that  matches
    if (identicalImg.includes(selectedImg[1].img)) {
      selectedImg.pop();
      return;
    }
    // get the element that was clicked
    const firstSelectedImg = document.querySelector(
      `.${selectedImg[0].imgclass}`
    );
    const secondSelectedImg = document.querySelector(
      `.${selectedImg[1].imgclass}`
    );

    // compare if the two images matches
    if (selectedImg[0].img === selectedImg[1].img) {
      imagesDoesMatch();
    } else {
      imageDoesNotMatch(firstSelectedImg, secondSelectedImg);
    }

    selectedImg = [];
  }
}

function imagesDoesMatch() {
  // store the value of the img that match
  identicalImg.push(selectedImg[0].img);
  // print out the score
  const scoreBoard = document.querySelector(".score");
  score++;
  scoreBoard.innerHTML = `Score:${score}`;
  if (score === 3) {
    setTimeout(() => {
      alert("You won");
      location.reload();
    }, 1000);
  }
}
function imageDoesNotMatch(img1, img2) {
  setTimeout(() => {
    const timesFailed = document.querySelector(".failed");
    attempt++;
    timesFailed.innerHTML = ` Failed Attempts:${attempt} `;
    // change img back to default
    img1.src = defaultImage;
    img2.src = defaultImage;
  }, 500);
}
