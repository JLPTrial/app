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

function Blank() {
  return <View style={styles.blank} />;
}

function UnderlineBlank({ color }: { color: string }) {
  return (
    <View style={[styles.underline_blank, { borderBottomColor: color }]} />
  );
}

function StarUnderlineBlank({ color }: { color: string }) {
  return (
    <View style={styles.star_underline_blank}>
      <Ionicons name="star" color={color} />
      <UnderlineBlank color={color} />
    </View>
  );
}

function Underlined({ children, color, appTextProps }: PropsWithChildren<{ color: string, appTextProps: Omit<AppTextProps, 'children'> }>) {
  return (
    <View style={styles.underlined}>
      <AppText {...appTextProps}>{children}</AppText>
      <View style={[styles.underline_blank, { width: '100%', borderBottomColor: color }]} />
    </View>
  );
}

type FuriganaProps = {
  kanji: string;
  furigana: string;
  fontSize: number;
  appTextProps: Omit<AppTextProps, 'children'>;
};

function Furigana({ kanji, furigana, fontSize, appTextProps }: FuriganaProps) {
  return (
    <View style={styles.furiganaContainer}>
      <AppText 
        {...appTextProps} 
        style={[appTextProps.style, styles.furiganaText, { fontSize: fontSize * 0.6 }]}
      >
        {furigana}
      </AppText>
      <AppText {...appTextProps}>{kanji}</AppText>
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
    <View style={styles.container}>
      {tokens.map((token, index) => {
        if (token === "[blank]")
          return <Blank key={index} />;
        if (token === "[underline_blank]")
          return <UnderlineBlank key={index} color={color} />;
        if (token === "[star_underline_blank]")
          return <StarUnderlineBlank key={index} color={color} />;
        if (token.startsWith("{"))
          return (
            <Underlined key={index} color={color} appTextProps={appTextProps}>
              {token.slice(1, -1)}
            </Underlined>
          );
        if (token.includes("[")) {
          const bracketIndex = token.indexOf("[");
          const prefix = token.slice(0, bracketIndex);
          const bracket = token.slice(bracketIndex);
          return (
            <Furigana 
              key={index} 
              kanji={prefix} 
              furigana={bracket.slice(1, -1)} 
              fontSize={fontSize}
              appTextProps={appTextProps} 
            />
          );
        }

        return <AppText key={index} {...appTextProps}>{token}</AppText>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  blank: {
    width: 15*vw,
    marginHorizontal: 4,
  },
  underline_blank: {
    width: 15*vw,
    borderBottomWidth: 0.2*vh,
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
  furiganaText: {
    marginBottom: -6,
    includeFontPadding: false,
  },
});