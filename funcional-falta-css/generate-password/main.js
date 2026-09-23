const form = document.querySelector("form");
const inputRange = document.querySelector("form input[type='range']");
const passLength = document.querySelector(".range");
const newPassword = document.querySelector(".password");
const btnCopy = document.querySelector(".btnCopy");
const btns = document.querySelectorAll('form input[type="checkbox"]');

inputRange.addEventListener("input", (e) => {
  const passwordLength = inputRange.value;
  passLength.textContent = passwordLength;
});

const createCompleteString = () => {
  let selectedChars = "";

  btns.forEach((btn) => {
    if (btn.checked) selectedChars += btn.value;
  });

  return selectedChars;
};

const generatePassword = (length, string) => {
  if (!string) return;
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * string.length);
    const letter = string[randomIndex];
    password += letter;
  }
  return password;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const lengthValue = inputRange.value;
  const completeSting = createCompleteString();
  const password = generatePassword(lengthValue, completeSting);
  newPassword.textContent = password || "Elige al menos una opción";
});

btnCopy.addEventListener("click", async () => {
  const passwordText = newPassword.textContent;
  if (!passwordText || passwordText === "Elige al menos una opción") return;

  try {
    await navigator.clipboard.writeText(passwordText);
    const btnMessage = btnCopy.textContent;
    btnCopy.textContent = "Copiado!!!";
    btnCopy.disabled = true;

    setTimeout(() => {
      btnCopy.textContent = btnMessage;
      btnCopy.disabled = false;
    }, 1500);
  } catch (e) {
    console.log("Error al copiar la contraeña: ", e);
  }
});
