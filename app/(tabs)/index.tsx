import { Image, SectionList, StyleSheet, Text, View } from 'react-native';

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
}

export default function HomeScreen() {
  const DATA = [
    {
      title: "A",
      data: [
        new UsingInfoItem("./assets/images/icon.png", "AAA", "Fucking"),
        new UsingInfoItem("./assets/images/icon.png", "BBB", "Sucking"),
      ]
    }
  ]

  return (
    <View style={styles.container}>


      <SectionList
        style={styles.usingInfoSectionList}
        sections={DATA}
        keyExtractor={(item, index) => item.getAppName() + index}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>今日已记录:{"\n"}0次</Text>
            </View>
          )
        }

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
              </View>
            </View>)
        }}

        renderSectionHeader={({section}) => {
          return (
            <View style={styles.usingInfoSectionListHeader}>
              <Text style={styles.usingInfoSectionListHeaderTitle}>{section.title}</Text>
            </View>
          )
        }}></SectionList>
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
    //justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
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
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE"
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
    marginLeft: 10
  },

  usingInfoItemPurpose: {
    fontSize: 10,
    marginStart: "auto",
    marginEnd: 10
  },
});

