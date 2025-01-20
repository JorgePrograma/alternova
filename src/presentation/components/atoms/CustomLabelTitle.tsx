import React from 'react';
import { Text } from 'react-native';

interface CustomLabelTitleProps {
  title: string;
}

const CustomLabelTitle: React.FC<CustomLabelTitleProps> = ({ title }) => {
  return (
    <Text className="text-2xl font-bold text-emerald-600">
      {title}
    </Text>
  )
}

export default CustomLabelTitle
