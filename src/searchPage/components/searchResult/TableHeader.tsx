import { Dispatch, SetStateAction, useState, useRef, useEffect, useMemo } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { BiSort } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";
import { SearchResultInterface } from "searchPage/types";
import { FILTERED_COLUMNS } from "utils";
import { Colors } from "../../../../public/assets/colors";
import cloneDeep from 'lodash/cloneDeep';

interface TableHeaderInterface {
  headerValue: string;
  headerKeyIndex: number;
  tableIndex: number;
  searchResult: SearchResultInterface;
  setVisualizeSearchResult: Dispatch<SetStateAction<SearchResultInterface>>;
  tablesState: any;
  setTablesState: Dispatch<SetStateAction<any[]>>;
  visualizeSearchResult: SearchResultInterface;
  checkboxDict: any;
  setCheckboxDict: Dispatch<SetStateAction<any>>;
}

const TableHeader = (props: TableHeaderInterface) => {
  const headerRef = useRef(null);
  const headers = useMemo(() => {
    return props.searchResult?.google_ads?.[props.tableIndex]?.[0] || [];
  }, [props.searchResult, props.tableIndex]);
  const [dropdownVisibility, setDropdownVisibility] = useState(
    Array(headers?.length).fill(false)
  );

  const [tempCheckboxDict, setTempCheckboxDict] = useState(props.checkboxDict);
  const onChangeCheckbox = (checkboxIndex: string, value: string) => {
    const index = tempCheckboxDict[checkboxIndex]?.indexOf(value);
    const checkedBoxes = tempCheckboxDict[checkboxIndex] || [];
    const newCheckedBoxes = index >= 0 ? checkedBoxes.filter((element) => element !== value) : checkedBoxes.concat(value);
    setTempCheckboxDict({ ...tempCheckboxDict, [checkboxIndex]: newCheckedBoxes });
    //props.setCheckboxDict({ ...props.checkboxDict, [checkboxIndex]: newCheckedBoxes })
  };

  // Filter table
  const onClickApplyBtnHandler = () => {
    let filteredData = props.searchResult.google_ads.map((tables) => {
      let data = tables.filter((rows, rowIndex) => {
        return (
          rowIndex === 0 ||
          Object.entries(tempCheckboxDict).every(
            ([key, values]: [string, Array<string>]) => {
              const col = rows[headers.indexOf(key)];
              return values.includes(col);
            }
          )
        );
      });
      return data;
    });
    props.setCheckboxDict(tempCheckboxDict);
    props.setVisualizeSearchResult((prev) => ({
      ...prev,
      google_ads: filteredData,
    }));
  };

  useEffect(() => {
    // Initializes the component when the effect runs for the first time. 
    // It sets the initial state of tempCheckboxDict to match the value of props.checkboxDict. 
    // This line is needed so that when the filter dropdown button is clicked for the first time, no unchecked boxes are shown.
    setTempCheckboxDict(props.checkboxDict);
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setTempCheckboxDict(props.checkboxDict);
        // Hide all dropdown menus
        setDropdownVisibility(Array(headers?.length).fill(false));
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [headers, props.checkboxDict]);

  const handleSort = (tableIndex, sortColumn) => {
    // Create a new copy of the props.tablesState object
    const newTablesState = [...props.tablesState];
    // Get the current table state for the specified table index
    const currentTableState = newTablesState[tableIndex];

    // Determine the new sort direction based on the current state
    let newSortDirection =
      currentTableState.sortDirection === "asc" ? "desc" : "asc";

    // If the sort column is different than the current one, set the direction to "asc"
    if (sortColumn !== currentTableState.sortColumn) {
      newSortDirection = "asc";
    }

    // Create a new table state object with the updated properties
    const newTableState = {
      ...currentTableState,
      sortColumn,
      sortDirection: newSortDirection,
    };

    // Replace the old table state object with the new one in the newTablesState array
    newTablesState[tableIndex] = newTableState;

    // Update the state with the new props.tablesState array
    props.setTablesState(newTablesState);
  };
  return (
    <th
      ref={headerRef}
      key={props.headerValue}
      style={{ cursor: "", minHeight: "500px" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dropdown
        className="dropdown-main"
        autoClose={true}
        show={dropdownVisibility[props.headerKeyIndex]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{props.headerValue}</span>
          <div>
            <span
              className="ms-2"
              style={{
                color: Colors.Primary,
                cursor: "pointer",
              }}
              onClick={() => handleSort(props.tableIndex, props.headerValue)}
            >
              <BiSort />
            </span>
            {FILTERED_COLUMNS.includes(props.headerValue) && (
              <Dropdown.Toggle
                split
                style={{
                  background: "transparent",
                  position: "relative",
                  color: Colors.Primary,
                  border: "unset",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                onClick={() => {
                  setDropdownVisibility(
                    dropdownVisibility.map((v, i) =>
                      i === props.headerKeyIndex ? !v : v
                    )
                  );
                }}
                id={`dropdown-split-basic`}
              >
                 <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: -28,
                      color: "red",
                      fontSize: 35,
                    }}
                  >
                    .
                  </span> 
                <MdFilterListAlt />
              </Dropdown.Toggle>
            )}
          </div>
        </div>

        <Dropdown.Menu className="px-1 my-2 filterDropDown" >
          <div
            className="filter-table-dropdown mt-2"
            style={{
              height: "auto",
              maxHeight: "170px",
              overflow: "scroll",
              /*margin: 0*/
            }}
          >
            {tempCheckboxDict &&
              [
                ...new Set(
                  props.searchResult?.google_ads?.[props.tableIndex]
                    .slice(1)
                    .map((item) => item[props.headerKeyIndex])
                ),
              ].map((option, index) => {
                return (
                  <div key={option}>
                    <div>
                      <Form.Group className="dropdown-item mb-0" style={{ paddingTop: 7, paddingBottom: 7 }}>
                        <div style={{ display: "flex" }}>
                          <Form.Check
                            type="checkbox"
                            className={`${props.headerValue
                              .split(" ")
                              .join("_")}`}
                            id={option}
                            label={option}
                            checked={tempCheckboxDict[
                              props.headerValue
                            ]?.includes(option)}
                            onChange={() =>
                              onChangeCheckbox(props.headerValue, option)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingTop: "5px",
            }}
          >
            <Button
              style={{
                background: Colors.Primary,
                border: "unset",
                padding: '10px 30px'
              }}
              onClick={() => {
                onClickApplyBtnHandler();
                setDropdownVisibility(
                  dropdownVisibility.map((v, i) =>
                    i === props.headerKeyIndex ? false : v
                  )
                );
              }}
              title="Apply"
            >
              Apply
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </th>
  );
};
export default TableHeader;
