import { db } from "../../authentication/components/FirebaseInit/FirebaseInit";
import { set, ref } from "firebase/database";
import toppings from "../../configurator/const/ToppingsList/ToppingsList";
import size from "../../configurator/const/Size/Size";
import discount from "../../configurator/const/Discount/Discount";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Slice";

function Database() {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  useEffect(() => {
    function writeToDatabase() {
      const initialConfigurationData = { toppings, size, discount };
      const initialConfigurationDataDb = ref(db, "initialConfigurationData");
      set(initialConfigurationDataDb, initialConfigurationData);

      const currentConfigurationDataDb = ref(db, "currentConfigurationData");
      set(currentConfigurationDataDb, currentConfiguration);
    }
    writeToDatabase();
  }, [currentConfiguration]);

  return <></>;
}

export default Database;
