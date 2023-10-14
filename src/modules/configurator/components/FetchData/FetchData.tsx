import { useEffect, useCallback } from "react";
import { OrderHistory, RootState, setAuthenticatedUser, setInitialConfiguration } from "../../../storage/Slice";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../../../authentication/components/FirebaseInit/FirebaseInit";
import { InitialConfiguration } from "../../../storage/Slice";

function FetchData() {
  const authenticatedUser = useSelector((state: RootState) => state.storage.authenticatedUser);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    const dataRef = ref(db, "/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const configurationDatabase = data.initialConfigurationData as InitialConfiguration;
        dispatch(setInitialConfiguration(configurationDatabase));
      }
    });
  }, [dispatch]);

  const fetchOrderHistory = useCallback(() => {
    const dataRef = ref(db, "/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (authenticatedUser.userId) {
          const userOrders = data.users[authenticatedUser.userId];

          if (userOrders && userOrders.orders) {
            const fetchedOrderHistory = userOrders.orders as OrderHistory[];

            dispatch(
              setAuthenticatedUser({
                ...authenticatedUser,
                orderHistory: Object.values(fetchedOrderHistory),
              })
            );
          }
        }
      }
    });
  }, [authenticatedUser, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (authenticatedUser.userId) fetchOrderHistory();
  }, [authenticatedUser.userId]);

  return <></>;
}

export default FetchData;
