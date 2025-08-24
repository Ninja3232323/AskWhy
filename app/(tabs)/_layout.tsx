import { Tabs } from 'expo-router';

import AboutFillingIcon from "@/assets/icons/about-filling.svg";
import AboutIcon from "@/assets/icons/about.svg";
import HomeFillingIcon from "@/assets/icons/home-filling.svg";
import HomeIcon from "@/assets/icons/home.svg";
import SettingsFillingIcon from "@/assets/icons/settings-filling.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Ignore the errors!
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          headerShown: false,
          tabBarStyle: {
            height: 75,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 0,
            elevation: 5
          },
          tabBarButton: (props: BottomTabBarButtonProps) => {
            /*
            if (Platform.OS !== "android") {
              return (
                <TouchableNativeFeedback
                  useForeground
                  onPress={props.onPress}
                //background={TouchableNativeFeedback.Ripple("#CCCFFF", true)}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {props.children}
                  </View>
                </TouchableNativeFeedback>
              );
            }
            */
            return (
            <View style={{
              flexDirection: "column",
            }}>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={props.onPress}
                onLongPress={props.onLongPress ?? undefined}
                style={props.style}
              >
                {props.children}
              </TouchableOpacity>
              <View style={{
                width: "100%",
                height: insets.bottom
              }} />
            </View>);
          },
        }}
      >
        <Tabs.Screen
          name="index"

          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => focused ? (
              <HomeFillingIcon width={28} height={28} />
            ) : (
              <HomeIcon width={28} height={28} />
            )
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => focused ? (
              <SettingsFillingIcon width={28} height={28} />
            ) : (
              <SettingsIcon width={28} height={28} />
            )
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => focused ? (
              <AboutFillingIcon width={28} height={28} />
            ) : (
              <AboutIcon width={28} height={28} />
            )
          }}
        />
      </Tabs>
    </>
  );
}
