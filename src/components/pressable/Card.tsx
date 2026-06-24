import { useTheme } from "@/hooks/useTheme";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { AppText } from "../texts/AppText";

type CardProps = {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, onPress, style} : CardProps){
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}
      style={[{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 20,
      }, style]}>

      {title && <AppText variant="title" style={{ color: colors.textLight }}>{ title }</AppText>}

    </Pressable>
  );
}