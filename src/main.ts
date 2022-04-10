import os from "os";
import * as repl from "./repl";

(async () => {
  console.log(
    `Hello ${os.userInfo().username}! This is Monkey programing language!`
  );
  console.log("Feel free to type in commands.\n");

  await repl.start();
})();
