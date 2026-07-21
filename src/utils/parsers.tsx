export default function statementParser(statement: string): string[] {
  const regex = new RegExp(
    [
      String.raw`\[(?:blank|underline_blank|star_underline_blank)\]`,
      String.raw`\{[^}]+\}`,
      String.raw`\p{Script=Han}+\[[^\]]+\]`,
      String.raw`\p{Script=Hiragana}+`,
      String.raw`\p{Script=Katakana}+`,
      String.raw`[、。「」『』（）！？：；]`,
      String.raw`\s+`,
      String.raw`.`
    ].join("|"),
    "gu"
  );

  return statement?.match(regex)?.filter(Boolean) ?? [];
}