import { useEffect, useCallback } from "react";
import { setInitialConfiguration } from "../../../storage/Slice";
import { useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../../../authentication/components/FirebaseInit/FirebaseInit";
import { InitialConfiguration } from "../../../storage/Slice";

function FetchData() {
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    const dataRef = ref(db, "initialConfigurationData");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const configurationDatabase = data as InitialConfiguration;
        dispatch(setInitialConfiguration(configurationDatabase));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <></>;
}

export default FetchData;
