import { useStorage } from "@/hooks/useStorage";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AppText } from "./texts/AppText";


export default function ExamLobbyHeader(){
  const { label } = useLocalSearchParams<{ type: string; label: string }>();
  const { data} = useStorage();

  return (
    <View style={styles.header}>
      <AppText variant='title'>{label}</AppText>
      <View >
        <AppText variant='tag'>{data.jlptLevel}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'stretch',
  },
});