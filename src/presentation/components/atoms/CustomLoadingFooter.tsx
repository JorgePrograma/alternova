import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const CustomLoadingFooter: React.FC = () => (
  <View className="py-4">
    <ActivityIndicator size="large" color="#059669" />
  </View>
);

export default React.memo(CustomLoadingFooter);
