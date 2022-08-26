import { Provider, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { PersistGate } from "redux-persist/integration/react";
import locales from "@/locales";
import { Locale } from "@/store/slices/config.slice";
import GlobalView from "./components/GlobalkStyle";
import Router from "./routers";
import { getLocaleSelector } from "./store/slices/config.slice";


// 引入styled
function App() {
  const locale: Locale = useSelector(getLocaleSelector);
  console.log(locale, 'localelocalelocalelocale')
  function onError(e: any) {
    console.log(e);
  }

  return (
    <IntlProvider onError={onError} locale={locale} messages={locales[locale]}>
      {/* <PersistGate persistor={persistor}> */}
      <GlobalView />

      <Router />
      {/* </PersistGate> */}
    </IntlProvider>
  );
}

export default App;
