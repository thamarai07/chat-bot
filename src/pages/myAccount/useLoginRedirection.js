import { get } from "lodash";
import { useLocation, useNavigate } from "react-router";

export const useLoginRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let navigateUrl = get(location, "search", "");
  if (navigateUrl !== "") {
    navigateUrl = navigateUrl.split("=");
  }
  const onSuccess = () => {
    if (navigateUrl.length > 0) {
      return navigate(navigateUrl[1]);
    }
  };
  return {
    onSuccessRedirect: onSuccess,
  };
};
