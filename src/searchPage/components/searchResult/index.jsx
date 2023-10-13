import React, { Dispatch, SetStateAction, useState } from "react";
import { Table } from "react-bootstrap";
import { SearchResultInterface } from "searchPage/types";
import { Colors } from "../../../../public/assets/colors";
import TableHeader from "./TableHeader";



const SearchResultTable = ({
  searchResult,
  setVisualizeSearchResult,
  visualizeSearchResult,
  checkboxDict,
  setCheckboxDict,
  activeSourceTab,
}) => {
  let activeSourceData;
  let visualizeActiveSourceData;
  if (activeSourceTab === 'googleAds') {
    activeSourceData = searchResult?.google_ads;
    visualizeActiveSourceData = visualizeSearchResult?.google_ads;
  } else if (activeSourceTab === 'facebookAds') {
    activeSourceData = searchResult?.facebook_ads;
    visualizeActiveSourceData = visualizeSearchResult?.facebook_ads;
  } else if (activeSourceTab === "facebookPage") {
    activeSourceData = searchResult?.facebook_page;
    visualizeActiveSourceData = visualizeSearchResult?.facebook_page;
  } else if (activeSourceTab === "ga4") {
    activeSourceData = searchResult?.ga4;
    visualizeActiveSourceData = visualizeSearchResult?.ga4;
  } else if (activeSourceTab === "searchConsole") {
    activeSourceData = searchResult?.search_console;
    visualizeActiveSourceData = visualizeSearchResult?.search_console;
  } else if (activeSourceTab === "bingAds") {
    activeSourceData = searchResult?.bing_ads;
    visualizeActiveSourceData = visualizeSearchResult?.bing_ads;
  }
  // This assumes that the size of google_ads is always a multiple of that of date_entities_list
  const tableIndexToDateIndexMap = {};
  for (let i = 0; i < searchResult?.date_entities_list?.length; i++) {
    tableIndexToDateIndexMap[
      (i * activeSourceData?.length) /
      searchResult?.date_entities_list?.length
    ] = i;
  }
  const itemsPerPage = 100;
  // Initialize the state for each table
  const [tablesState, setTablesState] = useState(
    Array(activeSourceData?.length).fill({
      sortColumn: null,
      sortDirection: "asc",
      currentPage: 0,
    })
  );
  const [hideZeroRows, setHideZeroRows] = useState(true);

  const performanceTitle = (metricName) => {
    if (metricName.toLowerCase().includes("cpa")) {
      return '"cost per acquisition"';
    }
    else if (metricName.toLowerCase().includes("cpc")) {
      return '"cost per click"';
    }
    else if (metricName.toLowerCase().includes("cpm")) {
      return '"cost per 1000 impressions"';
    }
    return "";
  }

  const sortedData = (index) => {
    const headers = activeSourceData?.[index]?.[0];
    const dataRows = visualizeActiveSourceData[index]?.slice(1);

    // Get the sorting state for the current table
    const { sortColumn, sortDirection } = tablesState[index];

    if (sortColumn) {
      const sortIndex = headers.indexOf(sortColumn);
      return dataRows.sort((a, b) => {
        const valueA = a[sortIndex];
        const valueB = b[sortIndex];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
        return sortDirection === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      });
    }

    if (hideZeroRows) {
      return dataRows?.filter(row => {
        // Filter out rows with the first column as "0".
        // This needs to be "==" instead of "==="
        if (row[0] == "0") {
          return false;
        }

        // Count the number of "0" occurrences in the row.
        const zeroCount = Array.isArray(row) && row.reduce((count, cell) => {
          if (cell == "0") {
            count++;
          }
          return count;
        }, 0);

        // Filter out rows with more than three "0" in total
        if (zeroCount >= 3) {
          return false;
        }

        return true;
      });
    }

    return dataRows;
  };
  // when search result is not available
  if (searchResult === null) {
    return (
      <>
        <div>
          <span
            style={{
              color: Colors.Primary,
              fontSize: 20,
            }}
          >
            Result not found.
          </span>
        </div>
      </>
    );
  }

  if (visualizeSearchResult && visualizeActiveSourceData) {
    const handlePageChange = (tableIndex, newPage) => {
      const newTablesState = [...tablesState];
      const currentTableState = newTablesState[tableIndex];
      if (
        newPage >= 0 &&
        newPage < Math.ceil(sortedData(tableIndex).length / itemsPerPage)
      ) {
        const newState = {
          ...currentTableState,
          currentPage: newPage,
        };

        newTablesState[tableIndex] = newState;
        setTablesState(newTablesState);
      }
    };
    const tableData = visualizeActiveSourceData.map(
      (item, tableIndex) => {
        const headers = visualizeActiveSourceData[tableIndex]?.[0] || [];
        const paginatedData = sortedData(tableIndex)?.slice(
          tablesState[tableIndex].currentPage * itemsPerPage,
          (tablesState[tableIndex].currentPage + 1) * itemsPerPage
        );
        return (
          <div key={tableIndex} style={{ marginTop: 16 }}>
            {searchResult?.date_entities_list[
              tableIndexToDateIndexMap[tableIndex]
            ] &&
              tableIndex in tableIndexToDateIndexMap && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      color: Colors.Primary,
                      textAlign: "center",
                      fontSize: 20,
                      marginTop: 15, // Add margin to the top
                    }}
                  >
                    Interpreted Date:{" "}
                    {
                      searchResult?.date_entities_list[
                      tableIndexToDateIndexMap[tableIndex]
                      ]?.[0]
                    }{" "}
                    to{" "}
                    {
                      searchResult?.date_entities_list[
                      tableIndexToDateIndexMap[tableIndex]
                      ]?.[1]
                    }
                  </span>
                </div>

              )}
            {
              searchResult?.extra_info.ranked_by_performance &&
              <h4
                style={{ display: "flex", paddingTop: "20px", paddingBottom: "15px" }}>{"Performance ranked by"} {performanceTitle(headers?.[0])}
              </h4>
            }
            <Table responsive striped hover bordered style={{ minHeight: 280 }}>
              <thead>
                <tr>
                  {Array.isArray(headers) &&
                    headers.map((key, headerKeyIndex) => (
                      <TableHeader
                        key={key}
                        headerValue={key}
                        headerKeyIndex={headerKeyIndex}
                        tableIndex={tableIndex}
                        searchResult={searchResult}
                        setVisualizeSearchResult={setVisualizeSearchResult}
                        tablesState={tablesState}
                        setTablesState={setTablesState}
                        visualizeSearchResult={visualizeSearchResult}
                        checkboxDict={checkboxDict}
                        setCheckboxDict={setCheckboxDict}
                      />
                    ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((row, rowIndex) => {
                  return (
                    <tr key={row.toString()}>
                      {checkboxDict?.["Status"]?.includes("Paused") && Array.isArray(row)
                        ? row.map((cell, cellIndex) => (
                          <td
                            style={{ minWidth: 85 }}
                            key={cellIndex}
                          >
                            {Array.isArray(cell) ? cell.join(", ") : cell}
                          </td>
                        ))
                        : Array.isArray(row) &&
                        !row.includes("Paused") &&
                        row.map((cell, cellIndex) => (
                          <td
                            style={{ minWidth: 85 }}
                            key={cellIndex}
                          >
                            {Array.isArray(cell) ? cell.join(', ') : cell}

                          </td>
                        ))}
                    </tr>
                  )
                }
                )}
              </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {sortedData(tableIndex)?.length > itemsPerPage && (
                <>
                  <button
                    onClick={() =>
                      handlePageChange(
                        tableIndex,
                        tablesState[tableIndex].currentPage - 1
                      )
                    }
                    disabled={tablesState[tableIndex].currentPage === 0}
                  >
                    {"<"}
                  </button>{" "}
                  <span>
                    Page {tablesState[tableIndex].currentPage + 1} of{" "}
                    {Math.ceil(sortedData(tableIndex).length / itemsPerPage)}
                  </span>{" "}
                  <button
                    onClick={() =>
                      handlePageChange(
                        tableIndex,
                        tablesState[tableIndex].currentPage + 1
                      )
                    }
                    disabled={
                      tablesState[tableIndex].currentPage ===
                      Math.ceil(sortedData(tableIndex).length / itemsPerPage) -
                      1
                    }
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      }
    );
    return (<>
      {tableData}
      <label style={{ display: "flex", justifyContent: "center", fontSize: "15px" }}>
        <input
          style={{ marginRight: "5px" }}
          type="checkbox"
          checked={hideZeroRows}
          onChange={() => { setHideZeroRows(!hideZeroRows) }}
        />
        Hide Rows with 0&apos;s
      </label>
    </>);
  }
};

const MemoizedSearchResultTable = React.memo(SearchResultTable);

export default MemoizedSearchResultTable;
