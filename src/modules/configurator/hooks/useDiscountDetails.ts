import { useSelector } from "react-redux";
import { RootState } from "../../storage/Slice";

export const useDiscountDetails = () => {
  return useSelector((state: RootState) => state.storage.discountDetails);
};
