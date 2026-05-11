import Screen from '@/components/Screen';
import statementParser from '@/utils/parsers';

const examples = [
  "もう　（[blank]）　を　おくりました　よ。",
  "[underline_blank]　の　ことばは　ひらがなで　どう　かきますか。",
  "ヤンさん　は　この　つくえ　を[underline_blank][underline_blank][star_underline_blank][underline_blank]よ。",
  "いつも　ここ　で　{しんぶん}　を　かいます。",
  "おふろ　に　入[はい]って　すこし　休[やす]んで　から、べんきょうします。"
];

export default function Exam() {

  return (
    <Screen>
      {statementParser(examples[0])}
      {statementParser(examples[1])}
      {statementParser(examples[2])}
      {statementParser(examples[3])}
      {statementParser(examples[4])}
    </Screen>
    
  );
}