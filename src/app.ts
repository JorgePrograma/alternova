import { initializeFirebase } from "./core/config/firebase/configFirebase";

export class App {
  private static instance: App;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await initializeFirebase();
      this.initialized = true;
      console.log("Firebase inicializado correctamente");
    } catch (error) {
      console.error("Error al inicializar Firebase:", error);
      throw error;
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}
