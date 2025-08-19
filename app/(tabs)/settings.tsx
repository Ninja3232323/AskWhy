import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, Modal, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class AppInfoItem {
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

  public setPurpose(purpose: string): void {
    this.purpose = purpose;
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
  static fromObject(obj: any): AppInfoItem {
    return new AppInfoItem(obj.appIconPath, obj.appName, obj.purpose);
  }
}

// 存储键常量
const STORAGE_KEYS = {
  USING_INFO_DATA: 'using-info-data',
  RECORD_COUNT: 'record-count'
};

// 模拟应用列表数据
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
          data: section.data.map((item: any) => AppInfoItem.fromObject(item))
        }));
        setData(transformedData);
      } else {
        // 如果没有保存的数据，使用默认数据
        setData([
          {
            title: "A",
            data: [
              new AppInfoItem("./assets/images/icon.png", "AAA", "Fucking"),
              new AppInfoItem("./assets/images/icon.png", "BBB", "Sucking"),
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
    } catch (error) {
      console.error('保存数据失败:', error);
      Alert.alert('错误', '保存数据失败');
    }
  };

  // 添加新数据项
  const addNewItem = (app: any) => {
    const newItem = new AppInfoItem(
      "./assets/images/icon.png", 
      app.name, 
      "新用途"
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
    setModalVisible(false);
    Alert.alert('成功', '应用已添加');
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

  // 渲染应用列表项
  const renderAppItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.appItem}
      onPress={() => addNewItem(item)}
    >
      <Image source={item.icon} style={styles.appIcon} />
      <Text style={styles.appName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 操作按钮 */}
      <View style={styles.buttonsContainer}>
        <Button title="添加新项目" onPress={() => setModalVisible(true)} />
        <Button title="清除所有数据" onPress={clearAllData} color="red" />
      </View>

      <SectionList
        style={styles.usingInfoSectionList}
        sections={data}
        keyExtractor={(item, index) => item.getAppName() + index}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>已添加的应用:{"\n"}{recordCount}个</Text>
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
                <View style={styles.appInfo}>
                  <Text style={styles.usingInfoItemAppName}>{item.getAppName()}</Text>
                  <Text style={styles.usingInfoItemPurpose}>{item.getPurpose()}</Text>
                </View>
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

      {/* 添加应用的模态框 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>选择要添加的应用</Text>
            
            <FlatList
              data={AVAILABLE_APPS}
              renderItem={renderAppItem}
              keyExtractor={item => item.id}
              style={styles.appsList}
            />
            
            <Button title="取消" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    height: 70,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 10,
  },

  appInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  usingInfoItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },

  usingInfoItemAppName: {
    fontSize: 16,
    fontWeight: '500',
  },

  usingInfoItemPurpose: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 模态框样式
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  appsList: {
    maxHeight: '70%',
    marginBottom: 15,
  },

  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },

  appName: {
    fontSize: 16,
  },
});