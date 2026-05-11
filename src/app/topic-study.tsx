import Screen from '@/components/Screen';
import Statement from '@/components/texts/Statement';
import { View } from 'react-native';

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
    <Screen style={{justifyContent: 'center'}}>
      <View style={{alignItems: 'center', gap: 20}}>
        <Statement statement={examples[0]}/>
        <Statement statement={examples[1]}/>
        <Statement statement={examples[2]} size={13}/>
        <Statement statement={examples[3]}/>
        <Statement statement={examples[4]}/>
        <Statement statement={examples[5]}/>
        <Statement statement={examples[6]}/>
        <Statement statement={examples[7]}/>
        <Statement statement={examples[8]} size={15}/>
      </View>
    </Screen>
    
  );
}