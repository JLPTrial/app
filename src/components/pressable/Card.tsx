import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { textStyles } from "../../styles/texts";

type CardProps = {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, onPress, style} : CardProps){
     
    return (
        <Pressable  onPress={onPress}
            style={[{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3af',
            borderRadius: 20,
            }, style]}>

            {title && <Text style={[{color: 'white'}, textStyles.title]}>{ title }</Text>}
            
        </Pressable>
    );
}