export const appendIndexToValue = (value, index) => `${value}-${index}`;

export const a11yProps = (value, index) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  className: value === index ? "active-tab" : "tab"
  });
  
  export const getTabClassName = (value, index) =>
    value === index ? "course-tab-title-active" : "course-tab-title";
  