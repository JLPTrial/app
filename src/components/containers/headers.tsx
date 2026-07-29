import { useColors } from "@/hooks/useTheme";
import { AppText } from "../texts/AppText";
import { StyleSheet, View } from 'react-native';

export default function Header( {title} : {title : string}) {
  const colors = useColors();
  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <AppText variant="title" style={{ color: colors.textLight }} center> {title} </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    margin: 10,
    borderRadius: 999,
  },
});