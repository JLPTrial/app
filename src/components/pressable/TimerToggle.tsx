import { useStorage } from "@/hooks/useStorage";
import { View } from "react-native";
import { AppText } from "../texts/AppText";
import { AppSwitch } from "./AppSwitch";

export default function TimerToggle() {
  const { data, setValue } = useStorage();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
      }}
    >

      <AppSwitch
        value={!!data.timer}
        onChange={(value) => setValue("timer", value)}
      />

      <AppText style={{ fontSize: 16 }}>
        Temporizador
      </AppText>
    </View>
  );
}