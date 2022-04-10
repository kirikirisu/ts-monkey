import { Token } from "../token";

interface Node {
  tokenLiteral: () => string;
}

export interface Statement extends Node {
  statementNode: () => void;
}

interface Expression extends Node {
  expressionNode: () => void;
}

interface IdentifierIF extends Expression {
  token: Token;
  value: string;
}

export class Identifier implements IdentifierIF {
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

interface LetStatementIF extends Statement {
  token: Token;
  name?: Identifier;
  value?: Expression;
}

export class LetStatement implements LetStatementIF {
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

interface ProgramIF {
  statements: Statement[];
}

export class Program {
  statements: Statement[] = [];

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }
}
