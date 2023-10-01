import PizzaToppings from "../modules/configurator/components/PizzaToppings/PizzaToppings";
import Navbar from "../modules/navigation/components/Navbar/Navbar";
import styles from "./Landing.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../modules/storage/Slice";
import { useState, useEffect } from "react";
import PizzaSize from "../modules/configurator/components/PizzaSize/PizzaSize";
import Discount from "../modules/configurator/components/Discount/Discount";
import OrderSummary from "../modules/configurator/components/OrderSummary/OrderSummary";

function Landing() {
  const [configuratorPopup, setConfiguratorPopup] = useState(false);

  const authenticatedUser = useSelector(
    (state: RootState) => state.storage.authenticatedUser
  );

  useEffect(() => {
    if (authenticatedUser) {
      const timeoutId = setTimeout(() => {
        setConfiguratorPopup(true);
      }, 2000);
      return () => clearTimeout(timeoutId);
    } else {
      setConfiguratorPopup(false);
    }
  }, [authenticatedUser]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {configuratorPopup && <PizzaToppings />}
      <PizzaSize />
      <Discount />
      <OrderSummary />
    </div>
  );
}

export default Landing;
