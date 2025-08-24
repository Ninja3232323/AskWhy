import styled from 'styled-components/native';
import { useTheme } from './ThemeContext';

// 容器组件
export const Container = styled.View`
  flex: 1;
  background-color: ${() => useTheme().colors.background};
  padding: 16px;
`;

// 卡片组件
export const Card = styled.View`
  border-radius: 12px;
  padding: 16px;
  margin-vertical: 8px;
  backgroundColor: #FFFFFF;
  elevation: 2
`;

// 按钮组件
export const NormalButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

export const DangerButton = styled.TouchableOpacity`
  background-color: ${() => useTheme().colors.danger};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin: 8px;
`;

// 文本组件
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${() => useTheme().colors.text};
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${() => useTheme().colors.text};
  margin-vertical: 4px;
`;

export const BodyText = styled.Text`
  font-size: 16px;
  color: ${() => useTheme().colors.text};
`;

export const Caption = styled.Text`
  font-size: 14px;
  color: ${() => useTheme().colors.textSecondary};
`;

// 输入框组件
export const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${() => useTheme().colors.border};
  border-radius: 8px;
  padding: 12px;
  margin-vertical: 8px;
  color: ${() => useTheme().colors.text};
  background-color: ${() => useTheme().colors.cardBackground};
`;

// 列表项组件
export const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${() => useTheme().colors.cardBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${() => useTheme().colors.border};
`;

// 头部组件
export const Header = styled.View`
  background-color: ${() => useTheme().colors.primary};
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

// 模态框组件
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 85%;
  background-color: ${() => useTheme().colors.background};
  border-radius: 12px;
  padding: 20px;
  elevation: 5;
`;