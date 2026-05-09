import Screen from '@/components/Screen';
import parser from '@/utils/parsers';

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
      {parser(examples[0])}
      {parser(examples[1])}
      {parser(examples[2])}
      {parser(examples[3])}
      {parser(examples[4])}
    </Screen>
    
  );
}