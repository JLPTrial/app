import { Ionicons } from '@expo/vector-icons';
import { IconProps, TextAaIcon, VibrateIcon } from 'phosphor-react-native';
import { View } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import { AppText } from "./texts/AppText";
import Statement from './texts/Statement';

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
  active?: boolean,
};

export const Icon = ({ name, size, color, furigana = '', active = true }: iconProps) => {
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
    return <View style={{ width: size, alignItems: 'center' }}>
      <Statement
        statement={furigana}
        scaleWithFontSize={false}
        style={{ fontSize: size, color: color , marginBottom: active ? 15 : 4 }}
      />
    </View>;
  }
  return <AppText style={{ fontSize: size, color: color }}>{name}</AppText>;
};