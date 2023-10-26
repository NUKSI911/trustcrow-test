import { CircularProgress, CircularProgressProps } from "@mui/material";

/**
 *
 * @param {import("@mui/material").CircularProgressProps} props
 */
function LoadingIndicator(props: CircularProgressProps) {
  return <CircularProgress {...props} />;
}

export default LoadingIndicator;
