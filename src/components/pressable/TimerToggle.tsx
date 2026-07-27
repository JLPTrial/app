import { useHaptics } from "@/hooks/useHaptics";
import { useStorage } from "@/hooks/useStorage";
import { View } from "react-native";
import { AppText } from "../texts/AppText";
import { AppSwitch } from "./AppSwitch";

export default function TimerToggle() {
  const { data, setValue } = useStorage();
  const haptics = useHaptics();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 12,
      }}
    >

      <AppText bold>Temporizador</AppText>

      <AppSwitch
        value={!!data.timer}
        onChange={(value) => {
          haptics.selection();
          setValue("timer", value);
        }}
      />

    </View>
  );
}