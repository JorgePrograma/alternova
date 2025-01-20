import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserModel } from "../../models/UserModel";
import { AuthDatasource } from "./Authdatasource";

export class AuthDatasourceImpl implements AuthDatasource {
  private auth = getAuth();

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<UserModel | null> {
    try {
      console.log("registrarse en fb")
    
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      console.log("registrado con exito")
      return {
        id: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
      };
    } catch (error) {
      console.error("Registration failed", error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<UserModel | null> {
      try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const { user } = userCredential;
      return {
        id: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
      };
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      console.error("Logout failed", error);
      return false;
    }
  }
}
