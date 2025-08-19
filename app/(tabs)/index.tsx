import AsyncStorage from '@react-native-async-storage/async-storage'; // 导入 AsyncStorage
import { useEffect, useState } from 'react'; // 添加 React Hooks
import { Alert, StyleSheet, Text, View } from 'react-native';

class UsingInfoItem {
  private appIconPath: string;
  private appName: string;
  private purpose: string;

  constructor(appIconPath: string, appName: string, purpose: string) {
    this.appIconPath = appIconPath;
    this.appName = appName;
    this.purpose = purpose;
  }

  public getAppIconPath(): string {
    return this.appIconPath;
  }

  public getAppName(): string {
    return this.appName;
  }

  public getPurpose(): string {
    return this.purpose;
  }

  // 添加 toJSON 方法以便序列化
  toJSON() {
    return {
      appIconPath: this.appIconPath,
      appName: this.appName,
      purpose: this.purpose
    };
  }

  // 添加静态方法从对象创建实例
  static fromObject(obj: any): UsingInfoItem {
    return new UsingInfoItem(obj.appIconPath, obj.appName, obj.purpose);
  }
}

// 存储键常量
const STORAGE_KEYS = {
  USING_INFO_DATA: 'using-info-data',
  RECORD_COUNT: 'record-count'
};

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [recordCount, setRecordCount] = useState(0);

  // 加载保存的数据
  useEffect(() => {
    loadSavedData();
  }, []);

  // 从 AsyncStorage 加载数据
  const loadSavedData = async () => {
    try {
      // 加载使用信息数据
      const savedData = await AsyncStorage.getItem(STORAGE_KEYS.USING_INFO_DATA);
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        // 将普通对象转换回 UsingInfoItem 实例
        const transformedData = parsedData.map((section: any) => ({
          ...section,
          data: section.data.map((item: any) => UsingInfoItem.fromObject(item))
        }));
        setData(transformedData);
      } else {
        // 如果没有保存的数据，使用默认数据
        setData([
          {
            title: "A",
            data: [
              new UsingInfoItem("./assets/images/icon.png", "AAA", "Fucking"),
              new UsingInfoItem("./assets/images/icon.png", "BBB", "Sucking"),
            ]
          }
        ]);
      }

      // 加载记录次数
      const savedCount = await AsyncStorage.getItem(STORAGE_KEYS.RECORD_COUNT);
      if (savedCount !== null) {
        setRecordCount(parseInt(savedCount));
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      Alert.alert('错误', '加载保存的数据失败');
    }
  };

  // 保存数据到 AsyncStorage
  const saveData = async (newData: any[], newCount: number) => {
    try {
      // 保存使用信息数据
      await AsyncStorage.setItem(STORAGE_KEYS.USING_INFO_DATA, JSON.stringify(newData));
      
      // 保存记录次数
      await AsyncStorage.setItem(STORAGE_KEYS.RECORD_COUNT, newCount.toString());
      
      setData(newData);
      setRecordCount(newCount);
      Alert.alert('成功', '数据已保存');
    } catch (error) {
      console.error('保存数据失败:', error);
      Alert.alert('错误', '保存数据失败');
    }
  };

  // 添加新数据项
  const addNewItem = () => {
    const newItem = new UsingInfoItem(
      "./assets/images/icon.png", 
      `App ${data[0]?.data.length + 1 || 1}`, 
      "New Purpose"
    );
    
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
  };

  // 清除所有数据
  const clearAllData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USING_INFO_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.RECORD_COUNT);
      setData([]);
      setRecordCount(0);
      Alert.alert('成功', '所有数据已清除');
    } catch (error) {
      console.error('清除数据失败:', error);
      Alert.alert('错误', '清除数据失败');
    }
  };

  // 更新特定项目
  const updateItem = (sectionIndex: number, itemIndex: number, newPurpose: string) => {
    const newData = [...data];
    newData[sectionIndex].data[itemIndex] = new UsingInfoItem(
      newData[sectionIndex].data[itemIndex].getAppIconPath(),
      newData[sectionIndex].data[itemIndex].getAppName(),
      newPurpose
    );
    saveData(newData, recordCount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Home </Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});