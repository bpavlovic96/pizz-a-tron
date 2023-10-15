import { useSelector } from "react-redux";
import { RootState } from "../../storage/Slice";

export const useAuthenticatedUser = () => {
  return useSelector((state: RootState) => state.storage.authenticatedUser);
};
