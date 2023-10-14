import PizzaToppings from "../modules/configurator/components/PizzaToppings/PizzaToppings";
import Navbar from "../modules/navigation/components/Navbar/Navbar";
import styles from "./Landing.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../modules/storage/Slice";
import { useState, useEffect } from "react";
import PizzaSize from "../modules/configurator/components/PizzaSize/PizzaSize";
import Discount from "../modules/configurator/components/Discount/Discount";
import OrderSummary from "../modules/configurator/components/OrderSummary/OrderSummary";
import Order from "../modules/order/Order";
import OrderSuccessful from "../modules/orderSuccessful/OrderSuccessful";

function Landing() {
  const [configuratorPopup, setConfiguratorPopup] = useState(false);

  const authenticatedUser = useSelector((state: RootState) => state.storage.authenticatedUser);

  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  useEffect(() => {
    if (authenticatedUser) {
      setConfiguratorPopup(true);
    } else {
      setConfiguratorPopup(false);
    }
  }, [authenticatedUser]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.configuratorWrapper}>
        {configuratorPopup && !currentConfiguration.ready && !currentConfiguration.finished ? (
          <>
            <PizzaToppings />
            <PizzaSize />
            <Discount />
            <OrderSummary />
          </>
        ) : configuratorPopup && currentConfiguration.ready && !currentConfiguration.finished ? (
          <Order />
        ) : configuratorPopup && currentConfiguration.ready && currentConfiguration.finished ? (
          <OrderSuccessful />
        ) : null}
      </div>
    </div>
  );
}

export default Landing;
