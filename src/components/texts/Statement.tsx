import { vh, vw } from "@/styles/globals";
import statementParser from "@/utils/parsers";
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

function Blank({ size=10 }: { size?: number}){

  return (
    <View style={[styles.blank, {width: size*vw}]}/>
  );
}

function UnderlineBlank({ size=10 }: { size?: number}){

  return (
    <View
      style={[styles.underline_blank, {width: size*vw}]}
    />
  );
}

function StarUnderlineBlank({ size=10 }: { size?: number}){

  return (
    <View style={styles.star_underline_blank}>
      <Ionicons name="star" color="#000"/>
      <UnderlineBlank size={size}/>
    </View>
        
  );
}

function Underlined({ children, size=10 } : PropsWithChildren<{size?: number}>){

  return (
    <Text style={[styles.underlined, {fontSize: size*1.5}]}>{children}</Text>
  );
}

type FuriganaProps = {
    kanji: string,
    furigana: string,
    size?: number
};

function Furigana({kanji, furigana, size=10} : FuriganaProps){
  return (
    <View style={styles.furigana}>
      <Text style={[styles.furiganaText, {fontSize: 0.7*size}]}>{furigana}</Text>
      <Text style={[styles.kanjiText, {fontSize: 1.5*size}]}>{kanji}</Text>
    </View>
  );
}

type StatementProps = {
  statement: string,
  size?: number,
}

export default function Statement({ statement, size=10 } : StatementProps){
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
          return <Blank key={index} size={size}/>;
        if (token === "[underline_blank]")
          return <UnderlineBlank key={index} size={size}/>;
        if (token === "[star_underline_blank]")
          return <StarUnderlineBlank key={index} size={size}/>;
        if (token.startsWith("{"))
          return <Underlined key={index} size={size}>{token.slice(1, -1)}</Underlined>;
        if (token.includes("[")){
          const bracketIndex = token.indexOf("[");

          const prefix = token.slice(0, bracketIndex);

          const bracket = token.slice(bracketIndex);

          return <Furigana key={index} kanji={prefix} furigana={bracket.slice(1, -1)} size={size}/>;
        }

        return <Text style={{fontSize: size*1.5}} key={index}>{token}</Text>;

      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blank: {
    marginHorizontal: 4,
  },
  underline_blank: {
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
    textAlign: "center",
    includeFontPadding: false,
  },
});