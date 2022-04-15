import { Lexer } from "../lexer";
import { Token, token, TokenType } from "../token";
import { Identifier, LetStatement, ReturnStatement, Program } from "../ast";
import { Statement } from "../ast/interface";

interface ParserIF {
  l: Lexer;

  curToken: Token;
  peekToken: Token;
  errors: string[];
}

export class Parser implements ParserIF {
  l: Lexer;
  curToken: Token;
  peekToken: Token;
  errors: string[];

  constructor(l: Lexer) {
    this.l = l;

    this.curToken = this.l.nextToken();
    this.peekToken = this.l.nextToken();
    this.errors = [];
  }

  nextToken(): void {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  parseProgram(): Program | null {
    const program = new Program();

    while (this.curToken.Type != token.EOF) {
      const stmt = this.parseStatement();
      if (stmt != null) {
        program.statements = [...program.statements, stmt];
      }
      this.nextToken();
    }

    return program;
  }

  parseStatement(): Statement | null {
    switch (this.curToken.Type) {
      case token.LET:
        return this.parseLetStatement();
      case token.RETURN:
        return this.parseReturnStatement();
      default:
        return null;
    }
  }

  parseReturnStatement(): ReturnStatement {
    const stmt = new ReturnStatement(this.curToken);

    this.nextToken();

    while (!this.curTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
  }

  parseLetStatement(): LetStatement | null {
    const stmt = new LetStatement(this.curToken);

    if (!this.expectPeek(token.IDENT)) {
      // throw new Error("let: letの後は識別子が期待されています。");
      return null;
    }

    stmt.name = new Identifier(this.curToken, this.curToken.Literal as string);

    if (!this.expectPeek(token.ASSIGN)) {
      // throw new Error("let: 識別子の後は = が期待されています。");
      return null;
    }

    while (!this.curTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
  }

  private expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(t);
      return false;
    }
  }

  private peekTokenIs(t: TokenType): boolean {
    return this.peekToken.Type === t;
  }

  private curTokenIs(t: TokenType): boolean {
    return this.curToken.Type === t;
  }

  pickUpErrors(): string[] {
    return this.errors;
  }

  peekError(t: TokenType): void {
    const msg = `expected next token to be ${t}, got ${this.peekToken.Type} instead`;
    this.errors = [...this.errors, msg];
  }
}
