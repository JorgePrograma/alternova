
import { initializeFirebase } from "./core/config/firebase/configFirebase";

export class App {
  private static instance: App;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private initialize() {
    initializeFirebase();
  }
}
