import axios from "axios";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_URL = "https://open.er-api.com/v6/latest";

async function currencyConverter(from, to, amount) {
  try {
    const res = await axios.get(`${API_URL}/${from}`);
    const rates = res.data.rates;

    if (!rates[to.toUpperCase()]) {
      console.log(`Currency code ${to} not found.`);
    }

    const converted = amount * rates[to.toUpperCase()];

    console.log(
      `${amount} ${from.toUpperCase()} = ${converted.toFixed(2)} ${to.toUpperCase()}`,
    );
  } catch (err) {
    console.log("Error", err.message);
  }
}

rl.question("Enter Target Currency: ", (from) => {
  rl.question("Enter the Base Currency: ", (to) => {
    rl.question("Enter the amount to be converted: ", (amount) => {
      currencyConverter(from, to, parseFloat(amount));
    });
  });
});
