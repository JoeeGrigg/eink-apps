import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, LinkProps } from 'expo-router'

export type HeaderProps = {
    title: string,
    icon?: keyof typeof FontAwesome.glyphMap,
    iconLink?: LinkProps['href'],
    iconColor?: string,
    iconOnPress?: () => {},
    iconLeft?: keyof typeof FontAwesome.glyphMap,
    iconLeftLink?: LinkProps['href'],
    iconLeftColor?: string,
    iconLeftOnPress?: () => {}
}

export function Header({
    title,
    icon,
    iconLink,
    iconColor,
    iconOnPress,
    iconLeft,
    iconLeftLink,
    iconLeftColor,
    iconLeftOnPress
}: HeaderProps) {
    return (
      <View style={styles.header}>
        {iconLeft ?
            (iconLeftLink ?
                <Link href={iconLeftLink} style={styles.iconLeft}>
                    <FontAwesome name={iconLeft} size={24}/>
                </Link>
                : <TouchableOpacity style={styles.iconLeft} onPress={iconLeftOnPress}><FontAwesome name={iconLeft} size={24} color={iconLeftColor}/></TouchableOpacity>
            )
            : <View style={styles.iconLeft}></View>
        }
        <Text style={styles.title}>{title}</Text>
        {icon ?
            (iconLink ?
                <Link href={iconLink} style={styles.icon}>
                    <FontAwesome name={icon} size={24}/>
                </Link>
                : <TouchableOpacity style={styles.icon} onPress={iconOnPress}><FontAwesome name={icon} size={24} color={iconColor}/></TouchableOpacity>
            )
            : <View style={styles.icon}></View>
        }
      </View>
    );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 20
  },
  icon: {
    marginLeft: 'auto',
    padding: 20
  },
  iconLeft: {
    marginRight: 'auto',
    padding: 20
  }
});