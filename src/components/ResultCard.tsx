import { colors } from "@/styles/globals";
import { StyleSheet, View } from "react-native";
import PercentageBar from "./PercentageBar";
import { AppText } from "./texts/AppText";


export default function ResultCard({ label, right, total} : { label : string, right : number, total : number}){
  const percentage = total > 0 ? Math.round((right / total) * 100) : 0;
  const scoreColor =
        percentage >= 70 ? colors.success :
          percentage >= 50 ? colors.mid :
            colors.failure;

  return (
    <View style={styles.resultCard}>
      <AppText style={{ color: colors.textMuted }}>Questões corretas - {label}</AppText>
      <AppText bold={true} style={[styles.scoreText, { color: scoreColor }]}>
        {right}/{total}
      </AppText>
      <AppText style={[styles.percentageText, { color: scoreColor }]}>
        {percentage}%
      </AppText>

      <PercentageBar
        progress={percentage}
        color={scoreColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: colors.successBlock,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 8,
  },
  scoreText: {
    fontSize: 48,
  },
  percentageText: {
    fontSize: 24,
  },
});