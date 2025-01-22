import { useAuthCheck } from "@/src/presentation/hooks/useAuthCheck";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
<<<<<<< HEAD
=======
import { useSelector } from "react-redux";
>>>>>>> d6a14a4 (se mejorlo la conexion a firebase)
import CustomLabelTitle from "../../components/atoms/CustomLabelTitle";
import { usePokemonFavorite } from "../../hooks/usePokemonFavorite";
import { usePokemonList } from "../../hooks/usePokemonsList";
import { RootState } from "../../store/store";
import FavoritePokemonList from "./components/FavoritePokemonList";
import PokemonList from "./components/PokemonList";

const PokemonScreen = () => {
  const router = useRouter();
  const { pokemons, isLoading, isLoadingMore, isRefreshing, handleLoadMore, handleRefresh } = usePokemonList();
  const { favorites } = usePokemonFavorite();
  const { deleteUser } = useAuthCheck();

  const filteredPokemons = useMemo(() => {
    const favoriteIds = new Set(favorites.map(fav => fav.id));
    return pokemons.results.filter(pokemon => !favoriteIds.has(pokemon.url.split("/").slice(-2)[0]));
  }, [pokemons.results, favorites]);

  const handlePokemonPress = (pokemonId: string, pokemonName: string) => {
    router.push({
      pathname: "/pokemon/[id]",
      params: { id: pokemonId, name: pokemonName },
    });
  };

  const handleLogout = async () => {
    try {
      const result = await deleteUser();
      if (result) {
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión: El resultado fue falso");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  

  return (
    <View className="bg-white flex-1 mt-10">
      <View className="pt-4 pr-5 flex flex-row justify-between">
        <CustomLabelTitle title="Popular" />
       <TouchableOpacity onPress={handleLogout}>
       <MaterialIcons name="logout" size={20} color="#059669" />
       </TouchableOpacity>
       </View>
      <View className="h-4/6">
        <PokemonList
          pokemons={{ ...pokemons, results: filteredPokemons }}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          isRefreshing={isRefreshing}
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          onPokemonPress={handlePokemonPress}
        />
      </View>
      <View className="p-4">
        <CustomLabelTitle title="Favoritos" />
        <FavoritePokemonList
          pokemons={favorites}
          onPokemonPress={handlePokemonPress}
        />
      </View>
    </View>
  );
};

export default React.memo(PokemonScreen);
