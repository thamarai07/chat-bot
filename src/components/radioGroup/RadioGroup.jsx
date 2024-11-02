import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./RadioGroup.scss";

export default function RowRadioButtonsGroup({
  handleChange,
  selected,
  config,
}) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={selected}
      >
        {config.map((each) => {
          const { value, label } = each;
          return (
            <FormControlLabel
              value={value}
              control={<Radio />}
              label={label}
              key={value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
