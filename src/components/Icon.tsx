import { Ionicons } from '@expo/vector-icons';
import { AppText } from "./texts/AppText";
import { WithLocalSvg } from 'react-native-svg/css';

type icon = keyof typeof Ionicons.glyphMap;

const assets: Record<string, any> = {
  //"name": require("../../assets/icons/name.svg"),
};

type iconProps = {
  name : string, 
  size : number, 
  color : any
};

export const Icon = ({name, size, color} : iconProps ) => {
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
  return <AppText style={{fontSize:size}}>{name}</AppText>;
};