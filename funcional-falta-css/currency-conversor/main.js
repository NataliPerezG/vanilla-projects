const form = document.querySelector("form");
const selectOrigin = document.querySelector(".currencyOrigin");
const selectTarget = document.querySelector(".currencyTarget");
const textCurrencyOrigin = document.querySelector(".textCurrencyOrigin");
const textAmount = document.querySelector(".textAmount");
const textCurrencyTarget = document.querySelector(".textCurrencyTarget");
const amount = document.querySelector("#amount");
const result = document.querySelector(".result");

const createOptions = (code, name) => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = `${code} -- ${name}`;
  return option;
};

const getCurrencies = async () => {
  const urlCurrencies = "https://api.frankfurter.dev/v2/currencies";
  const data = await fetch(urlCurrencies);
  const currencies = await data.json();

  currencies.forEach((currency) => {
    selectOrigin.append(createOptions(currency.iso_code, currency.name));
    selectTarget.append(createOptions(currency.iso_code, currency.name));
  });
};

getCurrencies();

const getRates = async () => {
  const origin = selectOrigin.value;
  const target = selectTarget.value;

  const url = `https://api.frankfurter.dev/v2/rate/${origin}/${target}`;

  const data = await fetch(url);
  const info = await data.json();
  textCurrencyOrigin.textContent = origin;
  textAmount.textContent = info.rate;
  textCurrencyTarget.textContent = target;

  return info.rate;
};

const calculateAmount = (rate) => {
  const currentAmount = +amount.value;
  if (!currentAmount) return;

  const totalAmount = (currentAmount * rate).toFixed(2);
  result.value = totalAmount;
};

form.addEventListener("input", async (e) => {
  e.preventDefault();
  const rate = await getRates();
  calculateAmount(rate);
});
