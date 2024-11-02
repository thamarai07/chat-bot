import React from "react";
import { TextField as SearchBar } from "@mui/material";
import SearchIcon from "../../assets/courses/searchIcon.png";
import Dropdown from "../dropdown";
import Image from "../image";

import "./Filters.scss";

const Filters = (props) => {
  const {
    handleSortBy,
    sortByValue,
    sortByOptions,
    sortByPlaceholder,
    sortBySX,
    sortByClassName,
    sortByVariant,
    sortByDisableUnderline,
    handleSearchStr,
    searchStr,
    searchClassName,
    searchPlaceholder,
    filterType,
  } = props;
  return (
    <div className="d-inline-flex align-items-center fullWidth row">
      <div className="justify-content-lg-end  col-md-6 col-12">
        <div
          className="fullWidth d-inline-flex align-items-center row"
          style={{ marginLeft: 0 }}
        >
          <label className="col-3 col-md-5 col-xl-3">
            <strong style={{ textWrap: "nowrap" }}>
              {filterType ? filterType : "Sort By"}
            </strong>
          </label>
          <div className="col-9 col-md-7 col-xl-9  sort-by-dropdown">
            <Dropdown
              variant={sortByVariant}
              onChange={handleSortBy}
              value={sortByValue}
              disableUnderline={sortByDisableUnderline}
              options={sortByOptions}
              placeholder={sortByPlaceholder}
              customSX={sortBySX}
              className={`sort-by-content ${sortByClassName}`}
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12">
        <div className="search-container">
          <SearchBar
            value={searchStr}
            placeholder={searchPlaceholder}
            className={`search-bar ${searchClassName} mr-xl-5`}
            classes={{
              searchIconButton: "search-button",
              searchContainer: "search-container",
              input: "search-input",
            }}
            searchIcon={
              <Image
                src={SearchIcon}
                width={40}
                height={40}
                className={"search-icon"}
              />
            }
            onChange={(e) => handleSearchStr(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
