import { useSelector } from "react-redux";
import { RootState } from "../../storage/Slice";

export const useCurrentConfiguration = () => {
  return useSelector((state: RootState) => state.storage.currentConfiguration);
};
