import { secondsToTimer } from "@/utils/parsers";
import { ReactNode, useEffect, useState } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { AppText } from "./texts/AppText";

type TimerProps = {
    start?: number;
    end?: number;
    onFinishTimer?: () => void;
    style?: StyleProp<TextStyle>;
    children?: ReactNode;
};

export default function Timer({
    start = 0,
    end,
    onFinishTimer,
    style,
    children,
}: TimerProps) {
    const [seconds, setSeconds] = useState(start);

    useEffect(() => {
        setSeconds(start);

        const increment =
            end === undefined ? 1 : end < start ? -1 : 1;

        const interval = setInterval(() => {
            setSeconds((current) => {
                if (end === undefined) {
                    return current + increment;
                }

                if (current === end) {
                    return current;
                }

                return current + increment;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [start, end]);

    useEffect(() => {
        if (end !== undefined && seconds === end) {
            onFinishTimer?.();
        }
    }, [seconds, end, onFinishTimer]);

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
            }}
        >
            <AppText
                style={[
                    { fontSize: 20, textAlign: "center" },
                    style,
                ]}
            >
                ⏱ {children} {secondsToTimer(seconds)}
            </AppText>

        </View>
    );
}