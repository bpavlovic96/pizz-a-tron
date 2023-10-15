import PizzaToppings from "../modules/configurator/components/PizzaToppings/PizzaToppings";
import Navbar from "../modules/navigation/components/Navbar/Navbar";
import styles from "./Landing.module.css";
import { useState, useEffect } from "react";
import PizzaSize from "../modules/configurator/components/PizzaSize/PizzaSize";
import Discount from "../modules/configurator/components/Discount/Discount";
import OrderSummary from "../modules/configurator/components/OrderSummary/OrderSummary";
import Order from "../modules/order/Order";
import OrderSuccessful from "../modules/OrderSuccessful/OrderSuccessful";
import { useCurrentConfiguration } from "../modules/configurator/hooks/useCurrentConfiguration";
import { useAuthenticatedUser } from "../modules/configurator/hooks/useAuthenticatedUser";

function Landing() {
  const [configuratorPopup, setConfiguratorPopup] = useState(false);

  const authenticatedUser = useAuthenticatedUser();

  const currentConfiguration = useCurrentConfiguration();

  useEffect(() => {
    authenticatedUser.userEmail ? setConfiguratorPopup(true) : setConfiguratorPopup(false);
  }, [authenticatedUser.userEmail]);

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
