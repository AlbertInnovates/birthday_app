// TODO: Replace teacher name in index.html before launch.
const introOverlay = document.querySelector("#introOverlay");
const introCard = document.querySelector("#introCard");
const surpriseButton = document.querySelector("#surpriseButton");
const balloonStage = document.querySelector("#balloonStage");
const revealTitle = document.querySelector("#revealTitle");
const birthdayAudio = document.querySelector("#birthdayAudio");
const messagesWall = document.querySelector("#messagesWall");
const complimentButton = document.querySelector("#complimentButton");
const complimentOutput = document.querySelector("#complimentOutput");
const secretStar = document.querySelector("#secretStar");

const colors = ["#ff6f61", "#ffd54f", "#68d8b0", "#2ab7ca", "#d63c6b", "#9b7bff"];
const noteColors = ["#fff4bd", "#c9f5df", "#ffd5df", "#d7efff", "#ffe0b5", "#e5dcff"];
const tilts = ["-3.5deg", "2.4deg", "-1.8deg", "3.1deg", "-2.6deg", "1.4deg"];
const compliments = [
  "Öğretmenim, sabrınızın şarjı yüzde yüz ve hızlı doluyor!",
  "Bugün sınıfın resmi kararı: En havalı öğretmen sizsiniz.",
  "Siz anlatınca konu bile kendini toparlayıp anlaşılır oluyor.",
  "Kahkahanız zil sesi olsa teneffüs hiç bitmesin isterdik.",
  "Sürpriz seven öğretmene sürpriz yapan sınıf: görev başarıyla tamamlandı!"
];

function renderMessages() {
  const messages = window.birthdayMessages || [];

  messagesWall.innerHTML = messages.map((message, index) => {
    const color = noteColors[index % noteColors.length];
    const tilt = tilts[index % tilts.length];

    return `
      <article class="note-card" style="--note-color: ${color}; --tilt: ${tilt};">
        <h3>${message.name}</h3>
        <p>${message.text}</p>
        <span class="note-emoji" aria-hidden="true">${message.emoji}</span>
      </article>
    `;
  }).join("");
}

function createBalloon(index) {
  const balloon = document.createElement("span");
  const size = 54 + Math.random() * 44;
  const left = 6 + Math.random() * 88;
  const duration = 2.7 + Math.random() * 1.2;

  balloon.className = "balloon";
  balloon.style.setProperty("--x", `${left}%`);
  balloon.style.setProperty("--size", `${size}px`);
  balloon.style.setProperty("--duration", `${duration}s`);
  balloon.style.setProperty("--color", colors[index % colors.length]);
  balloonStage.appendChild(balloon);

  if (index % 2 === 0) {
    window.setTimeout(() => popBalloon(balloon), 1050 + Math.random() * 900);
  }

  window.setTimeout(() => balloon.remove(), 4300);
}

function popBalloon(balloon) {
  if (!balloon.isConnected) return;

  const rect = balloon.getBoundingClientRect();
  balloon.classList.add("pop");
  createPopBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
  window.setTimeout(() => balloon.remove(), 240);
}

function createPopBurst(x, y) {
  const burst = document.createElement("span");
  burst.className = "pop-burst";
  burst.textContent = "PAT!";
  burst.style.setProperty("--x", `${x}px`);
  burst.style.setProperty("--y", `${y}px`);
  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 760);
}

function createConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2, amount = 42) {
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 210;

    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${x}px`);
    piece.style.setProperty("--y", `${y}px`);
    piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--dy", `${Math.sin(angle) * distance + 180}px`);
    piece.style.setProperty("--duration", `${0.95 + Math.random() * 0.9}s`);
    piece.style.setProperty("--color", colors[index % colors.length]);
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1900);
  }
}

function launchSurprise() {
  surpriseButton.disabled = true;
  introCard.classList.add("is-gone");

  // Browsers may reject the placeholder file until a real mp3 is added.
  birthdayAudio.volume = 0.85;
  birthdayAudio.play().catch(() => {
    console.info("Birthday audio placeholder could not play. Replace assets/sounds/birthday-tune.mp3 before launch.");
  });

  for (let index = 0; index < 18; index += 1) {
    window.setTimeout(() => createBalloon(index), index * 120);
  }

  window.setTimeout(() => {
    revealTitle.classList.add("is-visible");
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 90);
  }, 2850);

  window.setTimeout(() => {
    introOverlay.classList.add("is-hidden");
    document.body.classList.add("surprise-opened");
  }, 5000);
}

function wireExtras() {
  document.querySelectorAll(".confetti-trigger").forEach((button) => {
    button.addEventListener("click", (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 58);
    });
  });

  complimentButton.addEventListener("click", () => {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    complimentOutput.textContent = compliment;
    createConfetti(window.innerWidth / 2, window.innerHeight * 0.72, 30);
  });

  secretStar.addEventListener("click", () => {
    secretStar.classList.add("is-silly");
    complimentOutput.textContent = "Gizli yıldız bulundu! Bugünkü sözlü notu: bol kahkaha.";
    createConfetti(window.innerWidth - 70, 130, 46);
    window.setTimeout(() => secretStar.classList.remove("is-silly"), 950);
  });
}

surpriseButton.addEventListener("click", launchSurprise);
renderMessages();
wireExtras();
