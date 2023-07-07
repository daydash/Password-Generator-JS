const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeLowercaseElement = document.getElementById("includeLowercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwordDisplay");
const clearPassword = document.getElementById("clearPassword");
const clipboard = document.getElementById("clipboard");
const copyAlert = document.getElementById("copyAlert");
let isCopied = false;

clipboard.addEventListener("mouseover", () => {
  copyAlert.innerText = "Click to copy!";
  copyAlert.style.display = "block";
  //   setTimeout(() => {
  //     copyAlert.style.display = "none";
  //   }, 1200);
});

clipboard.addEventListener("mouseout", () => {
  isCopied ? (isCopied = false) : (copyAlert.style.display = "none");

  //   setTimeout(() => {
  //   copyAlert.style.display = "none";
  //   }, 1000);
});

const arrayFromLowerToHigher = (low, high) => {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
};

const syncCharacterAmount = (e) => {
  const value = e.target.value;
  characterAmountRange.value = value;
  characterAmountNumber.value = value;
};

const UPPERCASE_CHAR_CHODES = arrayFromLowerToHigher(65, 90);
const LOWERCASE_CHAR_CHODES = arrayFromLowerToHigher(97, 112);
const NUMBER_CHAR_CHODES = arrayFromLowerToHigher(48, 57);
const SYMBOL_CHAR_CHODES = arrayFromLowerToHigher(33, 47)
  .concat(arrayFromLowerToHigher(58, 64))
  .concat(arrayFromLowerToHigher(91, 96))
  .concat(arrayFromLowerToHigher(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

const generatePassword = (
  characterAmount,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) => {
  let charCodes = [];
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CHODES);
  if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CHODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CHODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CHODES);
  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
};

const copyContent = async (password) => {
  await navigator.clipboard.writeText(password);
  isCopied = true;
  copyAlert.innerText = "Copied!";
  copyAlert.style.display = "block";
  setTimeout(() => {
    copyAlert.style.display = "none";
  }, 1000);
};
clipboard.addEventListener("click", () => {
  const password = passwordDisplay.innerText;
  copyContent(password);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeLowercase = includeLowercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  if (
    !(includeUppercase || includeLowercase || includeNumbers || includeSymbols)
  ) {
    passwordDisplay.innerText = "Please Select the Checkbox!";
  } else {
    const password = generatePassword(
      characterAmount,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    passwordDisplay.innerText = password;
  }
});

clearPassword.addEventListener("click", () => {
  passwordDisplay.innerText = "";
});
