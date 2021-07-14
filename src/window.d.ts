import { Store } from "redux";

declare global {
  interface Window {
    store: Store
  }
}
