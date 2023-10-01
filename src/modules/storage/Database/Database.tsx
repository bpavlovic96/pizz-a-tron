import { db } from "../../authentication/components/FirebaseInit/FirebaseInit";
import { set, ref } from "firebase/database";
import toppings from "../../configurator/const/ToppingsList/ToppingsList";
import { useEffect } from "react";

function writeToDatabase() {
  const toppingsRef = ref(db, "initialToppingsData");
  set(toppingsRef, toppings);
}

function Database() {
  useEffect(() => {
    writeToDatabase();
  }, []);

  return <></>;
}

export default Database;
