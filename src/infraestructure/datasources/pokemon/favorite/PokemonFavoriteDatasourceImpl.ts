import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { PokemonFavoriteModel } from '@/src/infraestructure/models/PokemonFavoriteModel';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, where } from 'firebase/firestore';
import { PokemonFavoriteDatasource } from './PokemonFavoriteDatasource';
import FirebaseService from '@/src/core/config/firebase/firebaseService';

class PokemonFavoriteDatasourceImpl implements PokemonFavoriteDatasource {
  private collectionName = 'pokemonFavorites';
  private firestore: Firestore;

  constructor() {
    this.firestore = FirebaseService.getInstance().getFirestore();
  }
  async getPokemonsUserId(userId: string): Promise<PokemonFavoriteModel[]> {
    try {
      const q = query(collection(this.firestore, this.collectionName), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.warn(`No se encontraron favoritos para el userId: ${userId}`);
        return [];
      }
  
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const pokemon: PokemonFavoriteModel = {
          id: data.id,
          name: data.name,
          url: data.url,
          userId: data.userId
        };
        return pokemon;
      });
  
    } catch (error) {
      console.error("Error al obtener los pokémon favoritos:", error);
      throw error;
    }
  }
  

  async addPokemon(pokemon: PokemonFavorite): Promise<boolean> {
    
    console.log("pokemon a registra en favoritos ", JSON.stringify(pokemon))
    try {
      await addDoc(collection(this.firestore, this.collectionName), {
        id:pokemon.id,
        name: pokemon.name,
        url: pokemon.url,
        userId: pokemon.userId
      });
      return true;
    } catch (error) {
      console.error("Error adding pokemon: ", error);
      return false;
    }
  }

  async deletePokemonFavorite(id: string, userId: string): Promise<boolean> {
    console.log(`Eliminando pokemon con id ${id} para el usuario ${userId}`);
    try {
      const q = query(
        collection(this.firestore, this.collectionName),
        where("id", "==", id),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log(`No se encontró el pokemon favorito con id ${id} para el usuario ${userId}`);
        return false;
      }
  
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(this.firestore, this.collectionName, docToDelete.id));
      console.log(`Pokemon favorito eliminado exitosamente`);
      return true;
    } catch (error) {
      console.error("Error al eliminar el pokemon favorito: ", error);
      return false;
    }
  }

}

export default PokemonFavoriteDatasourceImpl;
