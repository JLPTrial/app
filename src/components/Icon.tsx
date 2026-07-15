import { Ionicons } from '@expo/vector-icons';
import { AppText } from "./texts/AppText";
import { WithLocalSvg } from 'react-native-svg/css';
import Statement from './texts/Statement';
import { View } from 'react-native';
import { VibrateIcon, TextAaIcon, IconProps } from 'phosphor-react-native';

type ionicon = keyof typeof Ionicons.glyphMap;

const svgAssets: Record<string, any> = {
  //"name": require("../../assets/icons/name.svg"),
};

const phosphorIcons: Record<string, React.FC<IconProps>> = {
  vibrate: VibrateIcon,
  textAa: TextAaIcon,
};

type iconProps = {
  name: string,
  size: number,
  color: string,
  furigana?: string,
};

export const Icon = ({ name, size, color, furigana = '' }: iconProps) => {
  if (name in Ionicons.glyphMap) {
    return <Ionicons
      name={name as ionicon}
      size={size}
      color={color}
    />;
  }
  if (name in svgAssets) {
    return <WithLocalSvg
      asset={svgAssets[name]}
      width={size}
      height={size}
      fill={color}
      color={color}
    />;
  }
  if (name in phosphorIcons) {
    const Icon = phosphorIcons[name];
    return <Icon size={size} color={color} />;
  }
  if (name === 'furigana') {
    return <View style={{ width: size, height: size }}>
      <Statement statement={furigana} style={{ fontSize: size * 0.9, color: color }} />
    </View>;
  }
  return <AppText style={{ fontSize: size, color: color }}>{name}</AppText>;
};