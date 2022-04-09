type TokenType = string;
type Byte = string | 0;

type Token = {
  Type: TokenType;
  Literal: Byte;
};

const token = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",

  IDENT: "IDENT",
  INT: "INT",

  ASSIGN: "=",
  PLUS: "+",

  COMMA: ",",
  SEMICOLON: ";",

  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",

  FUNCTION: "FUNCTION",
  LET: "LET",
};

interface KEYWORDS {
  [key: string]: TokenType;
}

const keywords: KEYWORDS = {
  fn: token.FUNCTION,
  let: token.LET,
};

const lookupIdent = (ident: string): TokenType => {
  if (keywords.hasOwnProperty(ident)) {
    const keyword = keywords[ident] as TokenType;
    return keyword;
  }

  return token.IDENT;
};

export { TokenType, Byte, Token, token, lookupIdent };
