"use client";

import store from "./store";
import { Provider } from "react-redux";
function ProviderRedux({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ProviderRedux;
