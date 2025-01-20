import { typeColors } from "@/src/core/constants/Colors";
import { generatePokemonImageUrl } from "@/src/core/utils";
import { PokemonDatasource } from "@/src/infraestructure/datasources/pokemon/PokemonDatasource";
import { PokemonDatasourceImpl } from "@/src/infraestructure/datasources/pokemon/PokemonDatasourceImpl";
import { PokemonInfoModel } from "@/src/infraestructure/models/PokemonInfoModel";
import { usePokemonFavorite } from '@/src/presentation/hooks/usePokemonFavorite';
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AboutPokemon from "./components/AboutPokemon";
import EvolutionPokemon from "./components/EvolutionPokemon";
import HeaderPokemon from "./components/HeaderPokemon";
import StatsPokemon from "./components/StatsPokemon";

const STYLES = {
  container: "flex-1",
  header: "flex-row justify-between items-center px-6 pt-12",
  idText: "text-white text-xl font-bold",
  contentSection: "flex-1 bg-black/40 rounded-t-3xl px-6 pt-6",
  tabsContainer: "flex-row justify-around mb-6",
  activeTab: "text-white font-bold border-b-2 border-white text-lg",
  inactiveTab: "text-white/60 text-lg"
};

const TabButton = memo(({ tab, activeTab, onPress }: { 
  tab: string; 
  activeTab: string; 
  onPress: () => void 
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text className={activeTab === tab ? STYLES.activeTab : STYLES.inactiveTab}>
      {tab}
    </Text>
  </TouchableOpacity>
));

const BackButton = memo(({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons name="arrow-back" size={24} color="white" />
  </TouchableOpacity>
));

const FavoriteButton = memo(({ isFavorite, onPress }: { isFavorite: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons 
      name={isFavorite ? "favorite" : "favorite-outline"} 
      size={24} 
      color="white" 
    />
  </TouchableOpacity>
));

const PokemonDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = usePokemonFavorite();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonInfoModel | null>(null);
  const [activeTab, setActiveTab] = useState("About");

  const pokemonDatasource: PokemonDatasource = new PokemonDatasourceImpl();

  const loadPokemonDetails = useCallback(async () => {
    try {
      const response = await pokemonDatasource.getPokemon(Number(id));
      setPokemonDetails(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [id]);

  useEffect(() => {
    loadPokemonDetails();
  }, [loadPokemonDetails]);

  const getBackgroundColor = useCallback(() => {
    if (pokemonDetails?.types[0]) {
      return typeColors[pokemonDetails.types[0].type.name] || "#A8A878";
    }
    return "#A8A878";
  }, [pokemonDetails?.types]);

  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleToggleFavorite = useCallback(() => {
    if (pokemonDetails) {
      toggleFavorite({ 
        id: id.toString(), 
        name: pokemonDetails.name, 
        imageUrl: generatePokemonImageUrl(id.toString())
      });
    }
  }, [toggleFavorite, id, pokemonDetails]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "About":
        return (
          <AboutPokemon
            height={pokemonDetails?.height || 0}
            weight={pokemonDetails?.weight || 0}
            abilities={pokemonDetails?.abilities || []}
          />
        );
      case "Stats":
        return <StatsPokemon stats={pokemonDetails?.stats || []} />;
      case "Evolution":
        return (
          <EvolutionPokemon 
            evolutions={pokemonDetails?.forms || []}
            path={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          />
        );
      default:
        return null;
    }
  }, [activeTab, pokemonDetails, id]);

  return (
    <View style={{ flex: 1, backgroundColor: getBackgroundColor() }}>
      <View className={STYLES.header}>
        <BackButton onPress={() => router.back()} />
        <Text className={STYLES.idText}>
          #{id.toString().padStart(3, "0")}
        </Text>
        <FavoriteButton isFavorite={isFavorite(id.toString())} onPress={handleToggleFavorite} />
      </View>

      <HeaderPokemon pokemon={pokemonDetails} />

      <View className={STYLES.contentSection}>
        <View className={STYLES.tabsContainer}>
          {["About", "Stats", "Evolution"].map((tab) => (
            <TabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              onPress={() => handleTabPress(tab)}
            />
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {renderTabContent()}
        </ScrollView>
      </View>
    </View>
  );
};

export default memo(PokemonDetailScreen);
