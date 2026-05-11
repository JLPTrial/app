import Screen from '@/components/Screen';
import statementParser from '@/utils/parsers';

const examples = [
  "もう　（[blank]）　を　おくりました　よ。",
  "[underline_blank]　の　ことばは　ひらがなで　どう　かきますか。",
  "ヤンさん　は　この　つくえ　を[underline_blank][underline_blank][star_underline_blank][underline_blank]よ。",
  "いつも　ここ　で　{しんぶん}　を　かいます。",
  "おふろ　に　入[はい]って　すこし　休[やす]んで　から、べんきょうします。",
  "しけん　は　{来月}　の　七月八日[しちがつようか]、木[もく]よう日[び]、九時[くじ]　から　です。",
  "しけん　は　来月[らいげつ]　の　七月八日[しちがつようか]、{木よう日}、九時[くじ]　から　です。",
  "ふうとう　に　お金[かね]　が　{八万円}　入[はい]っていました。",
  "{一日}　は　二十四時間[にじゅうよじかん]　です。そして、一時間[いちじかん]　は　六十分[ろくじゅっぷん]で、一分[いっぷん]　は　六十[ろくじゅう]びょう　です。",
];

export default function Exam() {

  return (
    <Screen>
      {statementParser(examples[0])}
      {statementParser(examples[1])}
      {statementParser(examples[2])}
      {statementParser(examples[3])}
      {statementParser(examples[4])}
      {statementParser(examples[5])}
      {statementParser(examples[6])}
      {statementParser(examples[7])}
      {statementParser(examples[8])}
    </Screen>
    
  );
}