import React from "react";
import { COMPONENT } from "../../constants/general";
import { appendIndexToValue } from "../../utils/general";
import Dropdown from "../dropdown";
import Input from "../input";

const RenderEngine = (props) => {
  const { config = [] } = props;
  let components = config.map((eachItem, index) => {
    const {
      variant,
      placeholder,
      customSX,
      type,
      onChange,
      id,
      value,
      disableUnderline,
      margin,
      className,
      options,
      label,
      containerClassName,
      elemtype,
      ...restProps
    } = eachItem;

    const key = appendIndexToValue(placeholder, index);

    switch (type) {
      case COMPONENT.INPUT: {
        if (elemtype === true)
          return (
            <Input
              margin={margin}
              className={className}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              key={key}
              {...restProps}
            />
          );
        else
          return (
            <Input
              type={elemtype}
              variant={variant}
              margin={margin}
              className={className}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              key={key}
              {...restProps}
            />
          );
      }
      case COMPONENT.DROPDOWN:
        return (
          <Dropdown
            variant={variant}
            label={label}
            customSX={customSX}
            onChange={onChange}
            value={value}
            disableUnderline={disableUnderline}
            id={id}
            key={key}
            options={options}
            containerClassName={containerClassName}
            placeholder={placeholder}
            {...restProps}
          />
        );
      default:
        return null;
    }
  });
  return components;
};

export default RenderEngine;
