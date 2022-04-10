import { token, Token, TokenType, Byte, lookupIdent } from "../token";

interface LexerIF {
  input: string;
  position: number;
  readPosition: number;
  ch: Byte;
}

export class Lexer implements LexerIF {
  input: string;
  position: number;
  readPosition: number;
  ch: Byte;

  constructor(input: string, position: number, readPosition: number, ch: Byte) {
    this.input = input;
    this.position = position;
    this.readPosition = readPosition;
    this.ch = ch;
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

    switch (this.ch) {
      case "=":
        tok = this.newToken(token.ASSIGN, this.ch);
        break;
      case ";":
        tok = this.newToken(token.SEMICOLON, this.ch);
        break;
      case "(":
        tok = this.newToken(token.LPAREN, this.ch);
        break;
      case ")":
        tok = this.newToken(token.RPAREN, this.ch);
        break;
      case ",":
        tok = this.newToken(token.COMMA, this.ch);
        break;
      case "+":
        tok = this.newToken(token.PLUS, this.ch);
        break;
      case "-":
        tok = this.newToken(token.MINUS, this.ch);
        break;
      case "!":
        tok = this.newToken(token.BANG, this.ch);
        break;
      case "/":
        tok = this.newToken(token.SLASH, this.ch);
        break;
      case "*":
        tok = this.newToken(token.ASTERISK, this.ch);
        break;
      case "<":
        tok = this.newToken(token.LT, this.ch);
        break;
      case ">":
        tok = this.newToken(token.GT, this.ch);
        break;
      case "{":
        tok = this.newToken(token.LBRACE, this.ch);
        break;
      case "}":
        tok = this.newToken(token.RBRACE, this.ch);
        break;
      case 0:
        tok = { Type: token.EOF, Literal: "" };
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = lookupIdent(literal);

          tok = { Type: type, Literal: literal };
          // console.log("tok", tok);
          return tok;
        } else if (this.isDigit(this.ch)) {
          const literal = this.readNumber();

          tok = { Type: token.INT, Literal: literal };
          // console.log(tok);
          return tok;
        } else {
          tok = this.newToken(token.ILLEGAL, this.ch);
        }
    }

    this.readChar();
    // console.log("tok", tok);
    return tok;
  }

  readIdentifier() {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  isLetter(ch: Byte): boolean {
    const ratz = /[a-z]/,
      rAtZ = /[A-Z]/;

    if (ch === 0) return false;
    if (ratz.test(ch) || rAtZ.test(ch)) {
      return true;
    }

    return false;
  }

  readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  isDigit(ch: Byte): boolean {
    const r0t9 = /[0-9]/;

    if (ch === 0) return false;
    if (r0t9.test(ch)) return true;
    return false;
  }

  skipWhitespace(): void {
    while (this.isWhitespace(this.ch)) {
      this.readChar();
    }
  }

  isWhitespace(ch: Byte): boolean {
    if (ch === 0) return false;

    if (
      this.ch == " " ||
      this.ch == "\n" ||
      this.ch == "\t" ||
      this.ch == "\r"
    ) {
      return true;
    }

    return false;
  }

  private newToken(tokenType: TokenType, ch: Byte): Token {
    return { Type: tokenType, Literal: ch };
  }
}
