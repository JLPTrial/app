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

function Blank({ width }: { width: number }) {
  return <View style={[styles.blank, { width: width }]} />;
}

function UnderlineBlank({ color, width, thickness }: { color: string, width: number, thickness: number }) {
  return (
    <View style={{ borderBottomColor: color, borderBottomWidth: thickness, width: width }} />
  );
}

function StarUnderlineBlank({ color, width, fontSize, thickness }: { color: string, width: number, fontSize: number, thickness: number }) {
  return (
    <View style={styles.star_underline_blank}>
      <Ionicons name="star" color={color} size={0.8 * fontSize} />
      <UnderlineBlank color={color} width={width} thickness={thickness} />
    </View>
  );
}

function Underlined({ children, color, lineThickness, appTextProps }: PropsWithChildren<{ color: string, lineThickness: number, appTextProps: Omit<AppTextProps, 'children'> }>) {
  return (
    <View style={styles.underlined}>
      <AppText style={{ top: 4.5 * lineThickness }} {...appTextProps}>{children}</AppText>
      <View style={{ top: 4.5 * lineThickness, width: '100%', borderBottomWidth: lineThickness, borderBottomColor: color }} />
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
        style={[appTextProps.style, styles.furiganaText, { top: 1, fontSize: fontSize * 0.6, lineHeight: fontSize }]}
      >
        {furigana}
      </AppText>
      <AppText {...appTextProps} style={[appTextProps.style, { top: 1, lineHeight: fontSize }]}>
        {kanji}
      </AppText>
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

  const scale = fontSize / textStyles['base'].fontSize;
  const blankWidth = scale * (15 * vw);
  const lineThickness = Math.max(0.2 * vh, scale * (0.2 * vh));

  return (
    <AppText 
      {...appTextProps}
      style={[
        { textAlign: 'justify', lineHeight: 1.8*fontSize }, 
        center && { textAlign: 'center' },
        appTextProps.style
      ]}
    >
      {tokens.map((token, index) => {
        if (token === "[blank]")
          return <Blank key={index} width={blankWidth} />;
        if (token === "[underline_blank]")
          return (
            <AppText key={index}>
              {" "}
              <UnderlineBlank color={color} width={blankWidth} thickness={lineThickness} />
              {" "}
            </AppText>
          );
        
        if (token === "[star_underline_blank]")
          return (
            <AppText key={index}>
              {" "}
              <StarUnderlineBlank color={color} width={blankWidth} fontSize={fontSize} thickness={lineThickness} />
              {" "}
            </AppText>
          );
        if (token.startsWith("{"))
          return (
            <Underlined key={index} color={color} lineThickness={lineThickness} appTextProps={appTextProps}>
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
    </AppText>
  );
}

const styles = StyleSheet.create({
  blank: {
    marginHorizontal: 4,
  },
  star_underline_blank: {
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
    marginBottom: -4,
    includeFontPadding: false,
  },
});