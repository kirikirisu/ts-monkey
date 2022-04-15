import { Lexer } from "../lexer";
import { Parser } from "../parser";
import { LetStatement } from "../ast";
import { Statement } from "../ast/interface";

test("parseProgramが期待したastを返すこと", () => {
  const input = `
let x  5;
let = 10;
let 838383;
  `;

  const l = new Lexer(input, 0, 1, input[0]);
  const p = new Parser(l);

  const program = p.parseProgram();
  if (program === null) throw new Error("parse program return null.");
  checkParserErrors(p);

  expect(program.statements.length).toBe(3);

  const tests = [
    { expectedIdentifier: "x" },
    { expectedIdentifier: "y" },
    { expectedIdentifier: "foobar" },
  ];

  tests.forEach((tt, i) => {
    const stmt = program.statements[i];
    testLetStatement(stmt, tt.expectedIdentifier);
  });
});

const testLetStatement = (s: Statement, name: string) => {
  expect(s.tokenLiteral()).toBe("let");
  expect(s instanceof LetStatement).toBeTruthy();

  const letStmt = s as LetStatement;
  if (!letStmt.name) throw new Error("letStmt.name is undefined");
  expect(letStmt.name.value).toBe(name);
  expect(letStmt.name.tokenLiteral()).toBe(name);
};

const checkParserErrors = (p: Parser) => {
  const errors = p.pickUpErrors();
  if (errors.length === 0) {
    return;
  }

  console.error(`parser has ${errors.length} errors`);
  errors.map((msg) => {
    console.error(`parser error: ${msg}`);
  });

  throw new Error("error happen on checkParserErrors()");
};
