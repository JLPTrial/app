import { secondsToTimer } from "@/utils/parsers";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AppText } from "./texts/AppText";

type TimerProps = {
    start?: number;
    end?: number;
    onFinishTimer?: () => void;
};

export default function Timer({
    start = 0,
    end,
    onFinishTimer,
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
        <View>
            <AppText style={{ fontSize: 20, textAlign: "center" }}>
                ⏱ {secondsToTimer(seconds)}
            </AppText>
        </View>
    );
}