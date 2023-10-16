import { useDispatch } from "react-redux";
import { setCurrentConfiguration, ShippingInformation } from "../storage/Slice";
import { useState, useEffect } from "react";
import DiscountButton from "../configurator/components/Discount/DiscountButton/DiscountButton";
import styles from "./Order.module.css";
import { ref, push } from "firebase/database";
import { db } from "../authentication/components/FirebaseInit/FirebaseInit";
import { useCurrentConfiguration } from "../configurator/hooks/useCurrentConfiguration";
import { useAuthenticatedUser } from "../configurator/hooks/useAuthenticatedUser";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputField from "./components/InputField/InputField";

function Order() {
  const currentConfiguration = useCurrentConfiguration();
  const authenticatedUser = useAuthenticatedUser();

  const dispatch = useDispatch();

  const [toppingsList, setToppingsList] = useState<string[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ShippingInformation>({ defaultValues: { street: "", city: "", postalCode: "", county: "" } });

  const onSubmit: SubmitHandler<ShippingInformation> = (data) => {
    const newShippingInformation = {
      ...data,
    };

    const newOrder = {
      id: currentConfiguration.id,
      toppings: currentConfiguration.toppings,
      size: currentConfiguration.size,
      discount: currentConfiguration.discount,
      quantity: currentConfiguration.quantity,
      total: currentConfiguration.total,
      shippingInformation: newShippingInformation,
    };

    if (authenticatedUser.userId) {
      const userOrderRef = ref(db, `users/${authenticatedUser.userId}/orders`);
      push(userOrderRef, newOrder);
    }

    dispatch(setCurrentConfiguration({ finished: true }));
  };

  useEffect(() => {
    const toppingsArray = currentConfiguration.toppings.map((topping) => topping.topping).join(", ");

    setToppingsList([toppingsArray]);
  }, [currentConfiguration.toppings]);

  useEffect(() => {
    let toppingsPrice = 0;
    currentConfiguration.toppings.map((topping) => (toppingsPrice += topping.price));

    const totalPrice =
      (currentConfiguration.size.price + toppingsPrice) *
      currentConfiguration.quantity *
      (1 - currentConfiguration.discount);

    if (totalPrice !== currentConfiguration.total) {
      dispatch(
        setCurrentConfiguration({
          total: Number.isNaN(totalPrice) ? 0 : totalPrice,
        })
      );
    }
  }, [
    currentConfiguration.discount,
    currentConfiguration.quantity,
    currentConfiguration.size.price,
    currentConfiguration.toppings,
    currentConfiguration.total,
    dispatch,
  ]);

  return (
    <div className={styles.orderScreenWrapper}>
      <h2 className={styles.header}>Almost done!</h2>
      <div className={styles.orderFormWrapper}>
        <div className={styles.orderDetails}>
          <h3 className={styles.subHeader}>Order details</h3>
          <div className={styles.toppings}>
            <span className={styles.toppingsHeader}>TOPPINGS</span>
            <p className={styles.toppingsList}>{toppingsList}</p>
          </div>

          <p className={styles.quantity}>QTY: {currentConfiguration.quantity}</p>

          <span className={styles.deliveryNote}>
            Delivery <br />
            Free delivery within 1 hour or you don't have to pay.
          </span>

          <div className={styles.discountButtonContainer}>
            <DiscountButton />
          </div>
          <div className={styles.priceWrapper}>
            <span>Total price</span>
            <span className={styles.orderTotal}>${currentConfiguration.total.toFixed(2)}</span>
          </div>
        </div>
        <div className={styles.shippingInformation}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.subHeader}>Shipping information</h3>
            <div className={styles.inputFieldWrapper}>
              <Controller
                name="street"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => <InputField {...field} error={errors.street} placeholder="Street" />}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => <InputField {...field} error={errors.city} placeholder="City" />}
              />
              <Controller
                name="postalCode"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => <InputField {...field} error={errors.postalCode} placeholder="Postal code" />}
              />
              <Controller
                name="county"
                control={control}
                render={({ field }) => <InputField {...field} error={errors.county} placeholder="County" />}
              />
            </div>
            <div className={styles.paymentDetailsWrapper}>
              <h3 className={styles.subHeader}>Payment details</h3>
              <span>Cash on delivery</span>
            </div>
            <input type="submit" className={styles.finishButton} value="Finish order" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
