import { Image } from 'expo-image';
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, useWindowDimensions } from 'react-native';

type Props = {
    imgSource: ImageSourcePropType;
    maxWidthPercentage?: number; // 可选：最大宽度占屏幕百分比（默认90%）
};

export default function ImageViewer({ imgSource, maxWidthPercentage = 0.9 }: Props) {
    const window = useWindowDimensions();
    const [aspectRatio, setAspectRatio] = useState(1); // 默认1:1

    // 计算最终显示尺寸
    const maxDisplayWidth = window.width * maxWidthPercentage;
    const displayWidth = Math.min(maxDisplayWidth, window.width);
    const displayHeight = displayWidth / aspectRatio;

    console.log("最终显示尺寸:", displayWidth, displayHeight);

    return (
        <Image
            source={imgSource}
            style={[
                styles.image,
                {
                    width: displayWidth,
                    height: displayHeight,
                },
            ]}
            onLoad={({ source: { width, height } }) => {
                console.log('图片原始尺寸:', width, height);
                setAspectRatio(width / height); // 计算并存储宽高比
            }}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 18,
    },
});