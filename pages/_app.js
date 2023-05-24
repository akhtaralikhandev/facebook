import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import "../../app/globals.css";
import { Provider } from "react-redux";
import store from "../redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/app/store";
export default function Home({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
