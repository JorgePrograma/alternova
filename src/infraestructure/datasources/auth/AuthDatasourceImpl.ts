import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserModel } from '../../models/UserModel';
import { AuthDatasource } from './Authdatasource';

export class AuthDatasourceImpl implements AuthDatasource {
  private auth = getAuth();

  async login(email: string, password: string): Promise<UserModel | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const { user } = userCredential;
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);
      return new UserModel(user.uid, user.displayName ?? '', user.email ?? '');
      } catch (error) {
      return null;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      console.error('Logout failed', error);
      return false;
    }
  }

}
