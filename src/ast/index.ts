import { Token } from "../token";
import {
  IdentifierIF,
  Expression,
  LetStatementIF,
  Statement,
} from "./interface";

class Identifier implements IdentifierIF {
  token: Token;
  value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  expressionNode(): void {}

  tokenLiteral(): string {
    return this.token.Literal as string;
  }
}

class LetStatement implements LetStatementIF {
  token: Token;
  name?: Identifier;
  value?: Expression;

  constructor(token: Token) {
    this.token = token;
  }

  statementNode(): void {}

  tokenLiteral(): string {
    return this.token.Literal as string;
  }
}

class Program {
  statements: Statement[] = [];

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }
}

export { Identifier, LetStatement, Program };
