import { Dispatch } from "redux";
import { setCurrentConfiguration, setDiscountDetails } from "../../storage/Slice";
import { v4 as uuidv4 } from "uuid";

const handleNewConfiguration = (dispatch: Dispatch) => {
  const newId = uuidv4();

  dispatch(
    setCurrentConfiguration({
      id: newId,
      toppings: [],
      size: { size: "", price: 0 },
      discount: 0,
      quantity: 1,
      total: 0,
      ready: false,
      finished: false,
    })
  );

  dispatch(
    setDiscountDetails({
      isDiscountApplied: false,
      discountWord: "",
    })
  );
};

export default handleNewConfiguration;
