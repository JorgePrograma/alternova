import { typeColors } from '@/src/core/constants/Colors';
import { PokemonInfo } from '@/src/domain/entities/PokemonInfo';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

interface HeaderPokemonProps {
  pokemon: PokemonInfo;
}

const HeaderPokemon: React.FC<HeaderPokemonProps> = ({ pokemon }) => {
  // Constantes para los estilos comunes
  const TEXT_STYLES = {
    pokemonName: "text-white text-3xl font-bold capitalize mb-2",
    typeText: "text-white capitalize"
  };

  const IMAGE_STYLES = "w-80 h-80";
  const TYPE_CONTAINER_STYLES = "px-4 py-1 rounded-full";

  return (
    <View className="items-center justify-center">
      <Image
        source={{
          uri: pokemon?.sprites.other?.["official-artwork"].front_default,
        }}
        className={IMAGE_STYLES}
        resizeMode="contain"
        accessibilityLabel={`Imagen de ${pokemon?.name}`}
      />
      <Text className={TEXT_STYLES.pokemonName}>
        {pokemon?.name}
      </Text>
      <View className="flex-row gap-2 mb-4">
        {pokemon?.types.map((type) => (
          <View
            key={type.type.name}
            style={{ backgroundColor: typeColors[type.type.name] }}
            className={TYPE_CONTAINER_STYLES}
          >
            <Text className={TEXT_STYLES.typeText}>
              {type.type.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(HeaderPokemon);
