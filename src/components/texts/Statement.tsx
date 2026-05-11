import { vh, vw } from "@/styles/globals";
import statementParser from "@/utils/parsers";
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

function Blank(){

  return (
    <View style={styles.blank}/>
  );
}

function UnderlineBlank(){

  return (
    <View
      style={styles.underline_blank}
    />
  );
}

function StarUnderlineBlank(){

  return (
    <View style={styles.star_underline_blank}>
      <Ionicons name="star" color="#000"/>
      <UnderlineBlank/>
    </View>
        
  );
}

function Underlined({ children } : PropsWithChildren){

  return (
    <Text style={styles.underlined}>{children}</Text>
  );
}

type FuriganaProps = {
    kanji: string,
    furigana: string,
    kanjiStyle?: object,
    furiganaStyle?: object,
};

function Furigana({kanji, furigana, kanjiStyle, furiganaStyle, } : FuriganaProps){
  return (
    <View style={styles.furigana}>
      <Text style={[styles.furiganaText, furiganaStyle]}>{furigana}</Text>
      <Text style={[styles.kanjiText, kanjiStyle]}>{kanji}</Text>
    </View>
  );
}

type StatementProps = {
  statement: string,
}

export default function Statement({ statement } : StatementProps){
  const tokens = statementParser(statement);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      {tokens.map((token, index) => {
        if (token === "[blank]")
          return <Blank key={index}/>;
        if (token === "[underline_blank]")
          return <UnderlineBlank key={index}/>;
        if (token === "[star_underline_blank]")
          return <StarUnderlineBlank key={index}/>;
        if (token.startsWith("{"))
          return <Underlined key={index}>{token.slice(1, -1)}</Underlined>;
        if (token.includes("[")){
          const bracketIndex = token.indexOf("[");

          const prefix = token.slice(0, bracketIndex);

          const bracket = token.slice(bracketIndex);

          return <Furigana key={index} kanji={prefix} furigana={bracket.slice(1, -1)}/>;
        }

        return <Text key={index}>{token}</Text>;

      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blank: {
    width: 10*vw,
    marginHorizontal: 4,
  },
  underline_blank: {
    width: 10*vw,
    borderBottomWidth: 0.15*vh,
    borderBottomColor: "#000",
    marginHorizontal: 4
  },
  star_underline_blank: {
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  underlined: {
    textDecorationLine: "underline",
  },
  furigana: {
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginHorizontal: 1
  },
  kanjiText: {
    textAlign: "center",
  },
  furiganaText: {
    fontSize: 7,
    textAlign: "center",
    includeFontPadding: false,
  },
});