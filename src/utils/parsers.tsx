export default function statementParser(statement : string) : string[]{
  const tokens =
        statement.split(
          /(\s+|\{[^}]+\}|\[(?:blank|underline_blank|star_underline_blank)\]|[、。「」『』（）！？：；]|(?<=\]))/g
        ).filter(Boolean);

  return tokens;
}