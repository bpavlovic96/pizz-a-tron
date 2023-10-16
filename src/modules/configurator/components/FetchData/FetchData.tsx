import { useEffect } from "react";
import { OrderHistory, setAuthenticatedUser, setInitialConfiguration } from "../../../storage/Slice";
import { useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../../../authentication/components/FirebaseInit/FirebaseInit";
import { InitialConfiguration } from "../../../storage/Slice";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

function FetchData() {
  const authenticatedUser = useAuthenticatedUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = () => {
      const dataRef = ref(db, "/");
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const configurationDatabase = data.initialConfigurationData as InitialConfiguration;
          dispatch(setInitialConfiguration(configurationDatabase));
        }
      });
    };

    fetchInitialData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(db, "/");
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        const userOrders = data.users[authenticatedUser.userId];
        if (userOrders && userOrders.orders) {
          const fetchedOrderHistory = userOrders.orders as OrderHistory[];
          dispatch(
            setAuthenticatedUser({
              orderHistory: Object.values(fetchedOrderHistory),
            })
          );
        }
      });
    };

    fetchData();
  }, [authenticatedUser.userId, dispatch]);

  return <></>;
}

export default FetchData;
