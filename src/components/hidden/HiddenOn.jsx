export const HiddenOn = ({ isHidden, fallback = null, children }) => {
  if (isHidden) {
    return fallback;
  }
  return children;
};
