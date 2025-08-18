import ImageViewer from "@/components/ImageViewer";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={aboutData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.type === 'text') {
            return <Text style={item.style}>{item.content}</Text>;
          } else if (item.type === 'image') {
            return <ImageViewer imgSource={item.source}/>;
          }
          return null;
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
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
  rowContainer: {
    flexDirection: 'row', // 关键：使子元素横向排列
    justifyContent: 'space-between', // 图片之间平均分配空间
    padding: 10,
  },
  image: {
    width: '48%', // 每张图片占容器宽度的48%（留4%作为间隔）
    aspectRatio: 1, // 保持正方形（可选，根据需求调整）
    borderRadius: 8,
  },
  listContent: {
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
});

// 准备数据，混合文字和图片
const aboutData = [
  { 
    id: 'header',
    type: 'text',
    content: 'About Us',
    style: styles.title 
  },
  { 
    id: 'subheader',
    type: 'text',
    content: 'Developers',
    style: styles.subtitle 
  },
  { 
    id: 'img1',
    type: 'image',
    source: require('@/assets/images/nina.jpg') 
  },
  { 
    id: 'description',
    type: 'text',
    content: 'We are a team of passionate developers...',
    style: styles.bodyText 
  },
  { 
    id: 'img2',
    type: 'image',
    source: require('@/assets/images/ninja32.jpg') 
  }
];