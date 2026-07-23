import { useColors } from "@/hooks/useTheme";
import { secondsToTimer } from "@/utils/parsers";
import { ReactNode, useEffect, useRef, useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { AppText } from "./texts/AppText";

type TimerProps = {
  start: number;
  end?: number;
  onFinishTimer?: () => void;
  style?: StyleProp<TextStyle>;
  expiredStyle?: StyleProp<TextStyle>;
  expiredPrefix?: ReactNode;
};

export default function Timer({
  start,
  end = 0,
  onFinishTimer,
  style,
  expiredStyle,
  expiredPrefix = "Tempo Excedido: +",
}: TimerProps) {
  const colors = useColors();
  const [seconds, setSeconds] = useState(start);
  const [isExpired, setIsExpired] = useState(false);
  const hasFinishedRef = useRef(false);

  const finalExpiredStyle = expiredStyle ?? { color: colors.error };

  useEffect(() => {
    setSeconds(start);
    setIsExpired(false);
    hasFinishedRef.current = false;

    const interval = setInterval(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

  useEffect(() => {
    if (end !== undefined && seconds === end && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      setIsExpired(true);
      onFinishTimer?.();
    }
  }, [seconds, end, onFinishTimer]);

  const displayText = isExpired
    ? expiredPrefix + secondsToTimer(seconds)
    : secondsToTimer(seconds);

  return (
    <AppText
      style={[
        { color: colors.textMuted },
        style,
        isExpired && finalExpiredStyle,
      ]}
    >
      ⏱ {displayText}
    </AppText>
  );
}