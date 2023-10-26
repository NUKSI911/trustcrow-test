import { globalInitialStateType } from "@/config/StoreSliceConfig";
import { useSelector } from "react-redux";

function useThemeMode() {
  return useSelector((state: globalInitialStateType) => state.global.themeMode);
}

export default useThemeMode;
