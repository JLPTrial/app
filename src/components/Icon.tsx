import { Ionicons } from '@expo/vector-icons';
import { AppText } from "./texts/AppText";
import { WithLocalSvg } from 'react-native-svg/css';
import Statement from './texts/Statement';
import { View } from 'react-native';

type icon = keyof typeof Ionicons.glyphMap;

const assets: Record<string, any> = {
  //"name": require("../../assets/icons/name.svg"),
};

type iconProps = {
  name : string, 
  size : number, 
  color : string,
  furigana?: string,
};

export const Icon = ({name, size, color, furigana = ''} : iconProps ) => {
  if(name in Ionicons.glyphMap){
    return <Ionicons
      name={name as icon}
      size={size}
      color={color}
    />;
  }
  if(name in assets){
    return <WithLocalSvg
      asset={assets[name]}
      width={size}
      height={size}
      fill={color}
      color={color}
    />;
  }
  if(name === 'furigana'){
    return <View style={{width:size, height:size}}>
      <Statement statement={furigana} style={{fontSize:size*0.9, color:color}}/>
    </View>;
  }
  return <AppText style={{fontSize:size, color:color}}>{name}</AppText>;
};