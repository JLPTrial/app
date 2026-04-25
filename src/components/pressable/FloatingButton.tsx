import { textStyles } from '@/styles/texts';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function FloatingButton(){
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('N5');

  const options = [
    'N5',
    'N4',
    'N3',
    'N2',
    'N1',
    ];

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.button} onPress={() => setOpen(!open)}>
                <Text style={textStyles.subtitle}>{ option }</Text>
            </Pressable>

            {open && (
                <View style={styles.menu}>
                    {options.map((item) => (
                    <Pressable
                        key={item}
                        style={styles.option}
                        onPress={() => {
                            setOption(item);
                            setOpen(false);
                        }}>
                        <Text style={textStyles.subtitle}>{item}</Text>
                    </Pressable>
                    ))}
                </View>
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 30,
    zIndex: 999,
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 30, 
    backgroundColor: '#a00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    elevation: 4,
  },
  option: {
    height: 50,
    width: 50,
    borderRadius: 30, 
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  }
});