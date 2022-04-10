import { Token } from "../token";
import { Identifier } from "../ast";

interface Node {
  tokenLiteral: () => string;
}

interface Statement extends Node {
  statementNode: () => void;
}

interface Expression extends Node {
  expressionNode: () => void;
}

interface IdentifierIF extends Expression {
  token: Token;
  value: string;
}

interface LetStatementIF extends Statement {
  token: Token;
  name?: Identifier;
  value?: Expression;
}

interface ProgramIF {
  statements: Statement[];
}

export { Node, Statement, Expression, IdentifierIF, LetStatementIF, ProgramIF };
