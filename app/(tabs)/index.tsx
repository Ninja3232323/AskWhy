import { AppInfoItem } from '@/app/global';
import {
  BodyText,
  Caption,
  Card,
  Container,
  DangerButton,
  Header,
  ListItem,
  ModalContainer,
  ModalContent,
  NormalButton,
  Title
} from '@/components/StyledComponents';
import { useTheme } from '@/components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, SectionList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEYS = {
  USING_INFO_DATA: 'using-info-data',
  RECORD_COUNT: 'record-count'
};

const AVAILABLE_APPS = [
  { id: '1', name: '微信', icon: require('@/assets/images/icon.png') },
  { id: '2', name: '支付宝', icon: require('@/assets/images/icon.png') },
  { id: '3', name: '抖音', icon: require('@/assets/images/icon.png') },
  { id: '4', name: '淘宝', icon: require('@/assets/images/icon.png') },
  { id: '5', name: '京东', icon: require('@/assets/images/icon.png') },
  { id: '6', name: '美团', icon: require('@/assets/images/icon.png') },
  { id: '7', name: '百度地图', icon: require('@/assets/images/icon.png') },
  { id: '8', name: '高德地图', icon: require('@/assets/images/icon.png') },
  { id: '9', name: '网易云音乐', icon: require('@/assets/images/icon.png') },
  { id: '10', name: 'QQ音乐', icon: require('@/assets/images/icon.png') },
];

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [recordCount, setRecordCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEYS.USING_INFO_DATA);
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        const transformedData = parsedData.map((section: any) => ({
          ...section,
          data: section.data.map((item: any) => AppInfoItem.fromObject(item))
        }));
        setData(transformedData);
      }

      const savedCount = await AsyncStorage.getItem(STORAGE_KEYS.RECORD_COUNT);
      if (savedCount !== null) {
        setRecordCount(parseInt(savedCount));
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      Alert.alert('错误', '加载保存的数据失败');
    }
  };

  const saveData = async (newData: any[], newCount: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USING_INFO_DATA, JSON.stringify(newData));
      await AsyncStorage.setItem(STORAGE_KEYS.RECORD_COUNT, newCount.toString());
      setData(newData);
      setRecordCount(newCount);
    } catch (error) {
      console.error('保存数据失败:', error);
      Alert.alert('错误', '保存数据失败');
    }
  };

  const addNewItem = (app: any) => {
    const newItem = new AppInfoItem("./assets/images/icon.png", app.name);

    const newData = [...data];
    if (newData.length > 0) {
      newData[0].data.push(newItem);
    } else {
      newData.push({
        title: "A",
        data: [newItem]
      });
    }

    saveData(newData, recordCount + 1);
    setModalVisible(false);
    Alert.alert('成功', '应用已添加');
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USING_INFO_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.RECORD_COUNT);
      setData([]);
      setRecordCount(0);
      Alert.alert('成功', '所有应用已清除');
    } catch (error) {
      console.error('清除数据失败:', error);
      Alert.alert('错误', '清除应用失败');
    }
  };

  return (
    <>
      <View style={{
        backgroundColor: "#FFFFFF",
        height: insets.top
      }} />
      <View style={{
        width: "100%",
        height: 70,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-between",
        justifyContent: "center",
        paddingHorizontal: 10
      }}>
        <Text style={{
          fontSize: 20
        }}>首页</Text>
      </View>
      <Container>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item.getAppName() + index}
          showsVerticalScrollIndicator={false}

          style={{
            padding: 2
          }}

          ListHeaderComponent={() => (
            <Header>
              <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                color: useTheme().colors.text
              }}>已添加的应用</Text>
              <Text style={{
                fontSize: 36,
                fontWeight: "bold",
                color: "#FFFFFF"
              }}>{recordCount}个</Text>
              <View style={{
                marginTop: 5,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <NormalButton onPress={() => setModalVisible(true)}
                  style={{
                    width: "45%",
                    backgroundColor: useTheme().colors.secondary
                  }}>
                  <BodyText numberOfLines={1} adjustsFontSizeToFit>添加新的应用</BodyText>
                </NormalButton>
                <DangerButton onPress={clearAllData}
                  style={{
                    width: "45%"
                  }}>
                  <BodyText numberOfLines={1} style={{ color: '#fff' }} adjustsFontSizeToFit>清除所有数据</BodyText>
                </DangerButton>
              </View>
            </Header>
          )}
          renderItem={({ item, index, section }) => {
            const isFirst = index === 0;
            const isLast = index === (section.data.length - 1);

            return (
              <Card style={{
                marginVertical: 0,
                borderWidth: 0,
                borderTopStartRadius: isFirst ? 12 : 0,
                borderTopEndRadius: isFirst ? 12 : 0,
                borderBottomStartRadius: isLast ? 12 : 0,
                borderBottomEndRadius: isLast ? 12 : 0,
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                <BodyText>{item.getAppName()}</BodyText>
              </Card>
            )
          }}
          renderSectionHeader={({ section }) => (
            <Caption>{section.title}</Caption>
          )}
          ListEmptyComponent={() => (
            <Card style={{
              alignItems: 'center',
            }}>
              <BodyText>暂无数据，点击"添加新应用"开始记录</BodyText>
            </Card>
          )}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContainer>
            <ModalContent>
              <Title style={{ textAlign: 'center' }}>选择要添加的应用</Title>

              <FlatList
                data={AVAILABLE_APPS}
                renderItem={({ item }: { item: any }) => (
                  <ListItem
                    onPress={() => addNewItem(item)}
                    style={{ borderRadius: 8, marginVertical: 4 }}
                  >
                    <Image source={item.icon} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                    <BodyText>{item.name}</BodyText>
                  </ListItem>
                )}
                keyExtractor={item => item.id}
                style={{ maxHeight: 400, marginVertical: 16 }}
              />

              <NormalButton
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: useTheme().colors.secondary
                }}>
                <BodyText style={{ color: '#fff' }}>取消</BodyText>
              </NormalButton>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </Container>
    </>

  );
}