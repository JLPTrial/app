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

export const secondsToTimer = (totalSeconds: number) : string => {
  if (totalSeconds < 0) totalSeconds = -totalSeconds;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds%3600 / 60);
  const secs = totalSeconds%3600 % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};