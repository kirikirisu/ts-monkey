import readline from "readline";
import { Lexer } from "../lexer";

const PROMPT = ">> ";

const readLine = (): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(PROMPT, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const start = async () => {
  while (true) {
    const inputCode = await readLine();
    const l = new Lexer(inputCode, 0, 1, inputCode[0]);

    while (true) {
      const token = l.nextToken();

      if (token.Type === "EOF") break;

      console.log(token);
    }
  }
};
