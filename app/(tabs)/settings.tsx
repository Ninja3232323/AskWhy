import {
  BodyText,
  Card,
  Container,
  ListItem
} from '@/components/StyledComponents';
import { useTheme } from '@/components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Image, Switch } from 'react-native';

class AppInfoItem {
  private appIconPath: string;
  private appName: string;

  constructor(appIconPath: string, appName: string) {
    this.appIconPath = appIconPath;
    this.appName = appName;
  }

  public getAppIconPath(): string {
    return this.appIconPath;
  }

  public getAppName(): string {
    return this.appName;
  }

  toJSON() {
    return {
      appIconPath: this.appIconPath,
      appName: this.appName,
    };
  }

  static fromObject(obj: any): AppInfoItem {
    return new AppInfoItem(obj.appIconPath, obj.appName);
  }
}

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

  const renderAppItem = ({ item }: { item: any }) => (
    <ListItem 
      onPress={() => addNewItem(item)}
      style={{ borderRadius: 8, marginVertical: 4 }}
    >
      <Image source={item.icon} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
      <BodyText>{item.name}</BodyText>
    </ListItem>
  );

  return (
    <Container>
      {/* 主题切换 */}
      <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <BodyText>深色模式</BodyText>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </Card>
    </Container>
  );
}