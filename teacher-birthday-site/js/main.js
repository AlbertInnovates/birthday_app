const audio = document.querySelector("#birthdayAudio");
const musicToggle = document.querySelector("#musicToggle");
const confettiLayer = document.querySelector("#confettiLayer");
const signatureGrid = document.querySelector("#signatureGrid");
const videoPlaceholder = document.querySelector(".video-placeholder");

const confettiColors = ["#b85b55", "#d8a0a0", "#c8a15c", "#f3d7c6", "#7e6b61"];
const signatureSlots = 12;

function showToast(message) {
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("p");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2700);
}

function createConfetti(amount = 72) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.setProperty("--left", `${Math.random() * 100}%`);
    piece.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    piece.style.setProperty("--spin", `${180 + Math.random() * 540}deg`);
    piece.style.setProperty("--duration", `${1.9 + Math.random() * 1.2}s`);
    piece.style.setProperty("--color", confettiColors[index % confettiColors.length]);
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3300);
  }
}

function renderSignatures() {
  const names = Array.isArray(window.class304Signatures) ? window.class304Signatures : [];
  const slots = Math.max(signatureSlots, names.length);

  signatureGrid.replaceChildren();

  Array.from({ length: slots }, (_, index) => {
    const name = names[index] || "";
    const signature = document.createElement("span");
    signature.className = name ? "signature-name" : "signature-name is-empty";
    signature.setAttribute("aria-label", name || "Empty signature space");
    signature.textContent = name;
    signatureGrid.appendChild(signature);
  });
}

async function toggleMusic() {
  if (!audio) return;

  if (!audio.paused) {
    audio.pause();
    musicToggle.classList.remove("is-playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play birthday music");
    return;
  }

  try {
    audio.volume = 0.48;
    await audio.play();
    musicToggle.classList.add("is-playing");
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.setAttribute("aria-label", "Pause birthday music");
  } catch (error) {
    showToast("Add a birthday melody to assets/sounds/birthday-tune.mp3 to enable music.");
  }
}

musicToggle.addEventListener("click", toggleMusic);

if (audio) {
  audio.addEventListener("ended", () => {
    musicToggle.classList.remove("is-playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play birthday music");
  });
}

videoPlaceholder.addEventListener("click", () => {
  showToast("Replace this placeholder with your recorded birthday video when it is ready.");
});

renderSignatures();
window.setTimeout(() => createConfetti(86), 320);
