import ImageViewer from '@/components/ImageViewer';
import { FlatList, StyleSheet, View } from 'react-native';

const images = [
  { id: '1', source: require('@/assets/images/nina.jpg') },
  { id: '2', source: require('@/assets/images/nina2.jpg') },
  // 可以继续添加更多图片...
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageViewer imgSource={item.source} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
});

