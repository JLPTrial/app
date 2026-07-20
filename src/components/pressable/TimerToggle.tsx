import { useStorage } from "@/hooks/useStorage";
import { Switch, View } from "react-native";
import { AppText } from "../texts/AppText";

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

      <Switch
        value={!!data.timer}
        onValueChange={(value) => setValue("timer", value)}
        trackColor={{ false: "#cfcfcf", true: "#4CAF50" }}
        thumbColor="#fff"
      />

      <AppText style={{ fontSize: 16 }}>
        Temporizador
      </AppText>
    </View>
  );
}