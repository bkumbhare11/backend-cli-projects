import readline, { createInterface } from "readline";
import fs from "fs";
import chalk from "chalk";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const file = "todos.json";

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify([]));
}

// Load Todos
const loadTodos = () => {
  const data = fs.readFileSync(file, "utf-8");
  return JSON.parse(data);
};

// Add Todo
const addTodo = (todos) => {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
};

// Menu Options
const showMenu = () => {
  console.log(chalk.blueBright("\n ========Todo Application========\n"));
  console.log(chalk.cyan("1. Add Todo"));
  console.log(chalk.cyan("2. View Todo"));
  console.log(chalk.cyan("3. Delete Todo"));
  console.log(chalk.cyan("4. Exit\n"));

  rl.question(chalk.magenta("Choose an option: "), handleMenu);
};

// HandleMenu Options
function handleMenu(option) {
  switch (option) {
    case "1": {
      rl.question(chalk.magenta("Enter Todo: "), (todo) => {
        const todos = loadTodos();

        todos.push({ todo, completed: false });

        addTodo(todos);

        console.log(chalk.green("Todo Added Successfully"));
        showMenu();
      });
      break;
    }

    case "2": {
      const todos = loadTodos();
      if (todos.length === 0) {
        console.log(chalk.red("No todos found!!"));
      } else {
        console.log(chalk.yellow("\nYour Todos\n"));
        todos.forEach((t, index) => {
          console.log(chalk.blueBright(`${index + 1}. ${t.todo}`));
        });
      }
      showMenu();
      break;
    }

    case "3": {
      const todos = loadTodos();
      if (todos.length === 0) {
        console.log(chalk.red("No todos found!!"));
      } else {
        rl.question(
          chalk.magenta("Enter the todo number you want to delete: "),
          (num) => {
            const index = parseInt(num) - 1;
            if (index >= 0 && index < todos.length) {
              todos.splice(index, 1);
              addTodo(todos);

              console.log(chalk.green("Todo Deleted Successfully"));
            } else {
              console.log(chalk.red("Invalid todo number"));
            }
            showMenu();
          },
        );
      }
      break;
    }

    case "4": {
      console.log(chalk.cyanBright("Goodbye"));
      rl.close();
      break;
    }

    default: {
      console.log(chalk.red("Invalid number"));
      showMenu();
    }
  }
}

showMenu();
