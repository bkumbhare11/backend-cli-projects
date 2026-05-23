import fs from "fs";
import readline from "readline";
import chalk from "chalk";

// Load Questions
const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

// CLI Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Quiz Logic
let score = 0;
let index = 0;

console.log(chalk.yellow.bold("Welcome to the Quiz App\n"));

function askQuestion() {
  if (index < questions.length) {
    const que = questions[index];
    console.log(chalk.blue(`Q${index + 1}. ${que.question}\n`));
    que.options.forEach((opt, i) => {
      console.log(chalk.green(`${i + 1} ${opt}`));
    });

    rl.question(chalk.cyan("\nYour answer (number): "), (answer) => {
      const userAnswer = parseInt(answer);

      if (userAnswer === que.answer) {
        console.log(chalk.green.bold("correct\n"));
        score++;
      } else {
        console.log(
          chalk.red.bold(`Wrong, The correct answer is ${que.answer} \n`),
        );
      }
      index++;
      askQuestion();
    });
  } else {
    console.log(
      chalk.yellow.bold(
        `\nQuiz Over!\nYour final score is ${score}/${questions.length}`,
      ),
    );
    rl.close();
  }
}
askQuestion();
