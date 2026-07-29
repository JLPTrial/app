import { useColors } from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";
import { AppText } from "../texts/AppText";

export default function LevelBadge({ level }: { level: string }) {
  const colors = useColors();
  return (
    <View style={[styles.levelBadge, { backgroundColor: colors.primary }]}>
      <AppText variant='tag'>{level}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  levelBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});