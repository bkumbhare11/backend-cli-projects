import axios from "axios";
import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your city: ", async (cityName) => {
  const apiKey = "api key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    let res = await axios.get(url);

    console.log(chalk.yellow("City:"), chalk.blue(res.data.name));
    console.log(
      chalk.yellow("Temperature:"),
      chalk.red(`${res.data.main.temp}°C`),
    );
    console.log(
      chalk.yellow("Description:"),
      chalk.green(res.data.weather[0].description),
    );
  } catch (err) {
    console.log("Error fetching weather: ", err.message);
  } finally {
    rl.close();
  }
});
