import { useSelector } from "react-redux";
import { RootState } from "../../storage/Slice";

export const useHoveredTopping = () => {
  return useSelector((state: RootState) => state.storage.hoveredTopping);
};
