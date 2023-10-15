import { useEffect, useCallback } from "react";
import { OrderHistory, setAuthenticatedUser, setInitialConfiguration } from "../../../storage/Slice";
import { useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../../../authentication/components/FirebaseInit/FirebaseInit";
import { InitialConfiguration } from "../../../storage/Slice";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

function FetchData() {
  const authenticatedUser = useAuthenticatedUser();
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
  console.log(authenticatedUser.userId);
  return <></>;
}

export default FetchData;
