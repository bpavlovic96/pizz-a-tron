import "./App.css";
import Landing from "./pages/Landing";
import store from "./modules/storage/Store";
import { Provider } from "react-redux";
import Database from "./modules/storage/Database/Database";

function App() {
  return (
    <>
      <Provider store={store}>
        <Database />
        <Landing />
      </Provider>
    </>
  );
}

export default App;
