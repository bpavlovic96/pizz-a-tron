import { useSelector } from "react-redux";
import { RootState } from "../../storage/Slice";

export const useInitialConfiguration = () => {
  return useSelector((state: RootState) => state.storage.initialConfiguration);
};
