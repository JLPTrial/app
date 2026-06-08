import { vh, vw } from "@/styles/globals";
import statementParser from "@/utils/parsers";
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { textStyles } from '../../styles/texts';
import { AppText, AppTextProps } from "./AppText";

interface StatementProps extends Omit<AppTextProps, 'children'> {
  statement: string;
}

  return (
    <View style={[styles.blank, {width: width}]}/>
  );
}

function UnderlineBlank({ style }: { style?: StyleProp<ViewStyle>}){

  return (
    <View
      style={[styles.underline_blank, style]}
    />
  );
}

function StarUnderlineBlank({ style }: { style?: StyleProp<ViewStyle>}){

  return (
    <View style={[styles.star_underline_blank]}>
      <Ionicons name="star" color="#000"/>
      <UnderlineBlank style={style}/>
    </View>
        
  );
}

function Underlined({ children, textStyle, underlineStyle } : PropsWithChildren<{textStyle?: StyleProp<TextStyle>, underlineStyle?: StyleProp<ViewStyle>}>){

  return (
    <View style={styles.underlined}>
      <AppText style={[styles.text, textStyle]}>{children}</AppText>
      <UnderlineBlank style={[underlineStyle, {width: '100%'}]}/>
    </View>
  );
}

type FuriganaProps = {
    kanji: string,
    furigana: string,
    style?: StyleProp<TextStyle>,
};

function Furigana({kanji, furigana, style} : FuriganaProps){
  const fontSize = StyleSheet.flatten(style)?.fontSize || StyleSheet.flatten(styles.kanjiText)?.fontSize;

  return (
    <View style={styles.furiganaContainer}>
      <AppText style={[styles.furiganaText, style, {fontSize: fontSize * 0.8}]}>{furigana}</AppText>
      <AppText style={[styles.kanjiText, style]}>{kanji}</AppText>
    </View>
  );
}

export default function Statement({ statement, ...appTextProps }: StatementProps) {
  const tokens = statementParser(statement);

  const { variant = 'base', answer, bold, underlining, center, style: customStyle } = appTextProps;

  const combinedStyles = [
    textStyles['base'],
    textStyles[variant],
    answer && textStyles.answer,
    bold && textStyles.bold,
    underlining && textStyles.underlining,
    center && textStyles.center,
    customStyle,
  ];

  const flattenedStyle = StyleSheet.flatten(combinedStyles) as TextStyle;

  const fontSize = flattenedStyle?.fontSize ?? 16;
  const color = (flattenedStyle?.color as string) ?? '#000';

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
          return <Blank key={index} style={underlineStyle}/>;
        if (token === "[underline_blank]")
          return <UnderlineBlank key={index} style={underlineStyle}/>;
        if (token === "[star_underline_blank]")
          return <StarUnderlineBlank key={index} style={underlineStyle}/>;
        if (token.startsWith("{"))
          return <Underlined key={index} textStyle={textStyle} underlineStyle={underlineStyle}>{token.slice(1, -1)}</Underlined>;
        if (token.includes("[")){
          const bracketIndex = token.indexOf("[");

          const prefix = token.slice(0, bracketIndex);

          const bracket = token.slice(bracketIndex);

          return <Furigana key={index} style={textStyle} kanji={prefix} furigana={bracket.slice(1, -1)}/>;
        }

        return <AppText style={[styles.text, textStyle]} key={index}>{token}</AppText>;

      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blank: {
    width: 15*vw,
    marginHorizontal: 4,
  },
  underline_blank: {
    width: 15*vw,
    borderBottomWidth: 0.2*vh,
    borderBottomColor: "#000",
    marginHorizontal: 4
  },
  star_underline_blank: {
    width: 15*vw,
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  underlined: {
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  furiganaContainer: {
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  kanjiText: {
    fontSize: 16,
  },
  furiganaText: {
    marginBottom: -6,
    includeFontPadding: false,
  },
  text: {
    fontSize: 16,
  }
});