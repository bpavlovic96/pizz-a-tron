import styles from "./OrderSuccessful.module.css";
import pizzaSlice from "../../assets/pizzaSlice.png";
import { useDispatch } from "react-redux";
import handleNewConfiguration from "./handleNewConfiguration/handleNewConfiguration";

function OrderSuccessful() {
  const dispatch = useDispatch();
  const handleBuyAnother = () => {
    handleNewConfiguration(dispatch);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={pizzaSlice} alt="Pizza slice" />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.header}>
          Your Pizza! Pizza!
          <br />
          is on it's way!
        </h1>
        <span className={styles.deliveryNote}>You should be enjoying your meal in no more than 45 minutes.</span>
        <button className={styles.button} onClick={handleBuyAnother}>
          Buy another
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessful;
