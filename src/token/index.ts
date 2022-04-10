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
  MINUS: "-",
  BANG: "!",
  ASTERISK: "*",
  SLASH: "/",

  EQ: "==",
  NOT_EQ: "!=",

  LT: "<",
  GT: ">",

  COMMA: ",",
  SEMICOLON: ";",

  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",

  FUNCTION: "FUNCTION",
  LET: "LET",
  TRUE: "TRUE",
  FALSE: "FALSE",
  IF: "IF",
  ELSE: "ELSE",
  RETURN: "RETURN",
};

interface KEYWORDS {
  [key: string]: TokenType;
}

const keywords: KEYWORDS = {
  fn: token.FUNCTION,
  let: token.LET,
  true: token.TRUE,
  false: token.FALSE,
  if: token.IF,
  else: token.ELSE,
  return: token.RETURN,
};

const lookupIdent = (ident: string): TokenType => {
  if (keywords.hasOwnProperty(ident)) {
    const keyword = keywords[ident] as TokenType;
    return keyword;
  }

  return token.IDENT;
};

export { TokenType, Byte, Token, token, lookupIdent };
