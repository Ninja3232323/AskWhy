import AsyncStorage from '@react-native-async-storage/async-storage'; // 导入 AsyncStorage
import { useEffect, useState } from 'react'; // 添加 React Hooks
import { Alert, Button, Image, SectionList, StyleSheet, Text, View } from 'react-native';

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
      {/* 操作按钮 */}
      <View style={styles.buttonsContainer}>
        <Button title="添加新项目" onPress={addNewItem} />
        <Button title="清除所有数据" onPress={clearAllData} color="red" />
      </View>

      <SectionList
        style={styles.usingInfoSectionList}
        sections={data}
        keyExtractor={(item, index) => item.getAppName() + index}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>今日已记录:{"\n"}{recordCount}次</Text>
          </View>
        )}

        renderItem={({item, index, section}) => {
          const isFirst = index === 0;
          const isLast = index === (section.data.length - 1);

          return (
            <View style={{
              width: "100%",
              height: "auto",
              overflow: "hidden",
              borderTopStartRadius: isFirst ? 8 : 0,
              borderTopEndRadius: isFirst ? 8 : 0,
              borderBottomStartRadius: isLast ? 8 : 0,
              borderBottomEndRadius: isLast ? 8 : 0,
            }}>
              <View style={styles.usingInfoItem}>
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={styles.usingInfoItemIcon} />
                <Text style={styles.usingInfoItemAppName}>{item.getAppName()}</Text>
                <Text style={styles.usingInfoItemPurpose}>{item.getPurpose()}</Text>
                <Button 
                  title="编辑" 
                  onPress={() => updateItem(
                    data.findIndex(sec => sec.title === section.title),
                    index,
                    "修改后的用途"
                  )} 
                />
              </View>
            </View>
          )
        }}

        renderSectionHeader={({section}) => {
          return (
            <View style={styles.usingInfoSectionListHeader}>
              <Text style={styles.usingInfoSectionListHeaderTitle}>{section.title}</Text>
            </View>
          )
        }}
        
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text>暂无数据，点击"添加新项目"开始记录</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: '100%',
    width: '100%',
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },

  header: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    height: 140,
    borderRadius: 10
  },

  headerText: {
    width: "auto",
    height: "auto",
    margin: 20,
    fontSize: 25,
    fontWeight: "bold"
  },
  
  usingInfoSectionList: {
    width: "95%",
    height: "auto",
  },
  
  usingInfoSectionListHeader: {
    width: "100%",
    height: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  usingInfoSectionListHeaderTitle: {
    fontSize: 10
  },

  usingInfoItem: {
    width: "100%",
    height: 70, // 增加高度以容纳按钮
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 10,
  },

  usingInfoItemIcon: {
    width: "auto",
    height: "70%",
    aspectRatio: 1,
    resizeMode: "cover",
    marginStart: 10
  },

  usingInfoItemAppName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },

  usingInfoItemPurpose: {
    fontSize: 10,
    marginHorizontal: 10,
    flex: 1,
  },

  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});