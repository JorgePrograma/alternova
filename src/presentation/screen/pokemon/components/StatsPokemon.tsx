import { Stat } from '@/src/domain/entities/PokemonInfo';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface StatsPokemonProps {
  stats: Stat[];
}

const TEXT_STYLES = {
  statName: "text-white capitalize",
  statValue: "text-white"
};

const VIEW_STYLES = {
  container: "bg-white/10 rounded-2xl p-6",
  statContainer: "mb-4",
  statHeader: "flex-row justify-between mb-2",
  progressBar: "h-2 bg-white/10 rounded-full overflow-hidden",
  progressFill: "h-full bg-white"
};

const StatBar: React.FC<{ value: number }> = memo(({ value }) => (
  <View className={VIEW_STYLES.progressBar}>
    <View
      className={VIEW_STYLES.progressFill}
      style={{ width: `${(value / 255) * 100}%` }}
    />
  </View>
));

const StatsPokemon: React.FC<StatsPokemonProps> = ({ stats }) => {
  const formatStatName = (name: string) => name.replace("-", " ");

  return (
    <View className={VIEW_STYLES.container}>
      {stats.map((stat) => (
        <View key={stat.stat.name} className={VIEW_STYLES.statContainer}>
          <View className={VIEW_STYLES.statHeader}>
            <Text className={TEXT_STYLES.statName}>
              {formatStatName(stat.stat.name)}
            </Text>
            <Text className={TEXT_STYLES.statValue}>
              {stat.base_stat}
            </Text>
          </View>
          <StatBar value={stat.base_stat} />
        </View>
      ))}
    </View>
  );
};

export default memo(StatsPokemon);
