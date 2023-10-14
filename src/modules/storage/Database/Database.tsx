import { db } from "../../authentication/components/FirebaseInit/FirebaseInit";
import { set, ref } from "firebase/database";
import toppings from "../../configurator/const/ToppingsList/ToppingsList";
import size from "../../configurator/const/Size/Size";
import discount from "../../configurator/const/Discount/Discount";
import { useEffect } from "react";

function Database() {
  useEffect(() => {
    function writeToDatabase() {
      const initialConfigurationData = { toppings, size, discount };
      const initialConfigurationDataDb = ref(db, "initialConfigurationData");
      set(initialConfigurationDataDb, initialConfigurationData);
    }
    writeToDatabase();
  }, []);

  return <></>;
}

export default Database;
