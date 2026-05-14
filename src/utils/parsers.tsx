const regex = new RegExp(
  [
    "\\[(?:blank|underline_blank|star_underline_blank)\\]",

    "\\{[^}]+\\}",

    "\\p{Script=Han}+\\[[^\\]]+\\]",

    "\\p{Script=Hiragana}+",

    "\\p{Script=Katakana}+",

    "[、。「」『』（）！？：；]",

    "\\s+",

    "."
  ].join("|"),
  "gu"
);

export default function statementParser(statement: string): string[] {
  return statement.match(regex)?.filter(Boolean) ?? [];
}