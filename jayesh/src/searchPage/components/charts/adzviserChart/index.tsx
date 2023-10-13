import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import MainCharts from "..";
import { capitalizeFirstLetter, MONTHS } from "../../../../utils";

const SearchResultChart = ({ visualizationData }) => {
  const visualizationFlags = visualizationData?.extra_info?.visualization;
  // starting from row 1 is the actual data. Row 0 is the header.
  const breakdownData = visualizationData?.google_ads?.map((item) =>
    item.slice(1)
  );

  //const isAccountLevel
  const headersInfo = useMemo(() => {
    const dropDownCategoriesAndIndices = [];
    let campaignColIndex = -1;
    let dateColIndex = -1;
    let weekColIndex = -1;
    let monthColIndex = -1;

    const columnData = visualizationData?.google_ads?.[0]?.[0] || [];

    columnData.forEach((column, i) => {
      if (column === "Campaign" && visualizationData?.intent === "campaign_overview") {
        campaignColIndex = i;
      } else if (column === "Date") {
        dateColIndex = i;
      } else if (column === "Week") {
        weekColIndex = i;
      } else if (column === "Month") {
        monthColIndex = i;
      } else {
        dropDownCategoriesAndIndices.push({ index: i, name: column });
      }
    });

    return { dropDownCategoriesAndIndices, campaignColIndex, dateColIndex, weekColIndex, monthColIndex };
  }, [visualizationData]);

  const [category, setCategory] = useState({
    index: headersInfo?.dropDownCategoriesAndIndices?.[0]?.index,
    name: headersInfo?.dropDownCategoriesAndIndices?.[0]?.name,
  });
  const [accountDailyData, setAccountDailyData] = useState<number[][]>();
  const [accountWeeklyData, setAccountWeeklyData] = useState<{ [key: string]: number }[]>();
  const [accountMonthlyData, setAccountMonthlyData] = useState<{ [key: string]: number }[]>();
  const [accountAggregatedData, setAccountAggregatedData] = useState<number[]>();
  const [campaignDailyData, setCampaignDailyData] = useState<{}>();
  const [campaignWeeklyData, setCampaignWeeklyData] = useState<{}>();
  const [campaignMonthlyData, setCampaignMonthlyData] = useState<{}>();
  const [campaignAggregatedData, setCampaignAggregatedData] = useState<{}>();

  const campaignNames =
    headersInfo?.campaignColIndex == -1
      ? []
      : [
        ...new Set(
          breakdownData
            ?.map((item) =>
              item.map((item2) => item2[headersInfo?.campaignColIndex])
            )
            .flat()
        ),
      ];

  const templateLineChartConfig = {
    series: [],

    options: {
      chart: {
        type: "line",
        toolbar: {
          show: true,
        },
      },
      title: {
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "rgb(64, 144, 147)",
        },
      },
      stroke: {
        width: Array.from({ length: breakdownData?.length }).fill(2),
        curve: "straight",
      },
      labels: Array.from({ length: 31 }, (v, i) => i + 1),
      xaxis: { max: 31 },

      yaxis: {
        title: {
          text: capitalizeFirstLetter(category?.name),
        },
      },
      tooltip: {
        show: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          customIcons: [],
        },
      },
    },
  };

  const templateBarChartConfig = {
    series: [],
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },

        id: "apexchart-example",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            // reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      yaxis: {
        reversed: false,
      },

      xaxis: {
        categories: breakdownData?.map(
          (singlePeriodData, index) =>
            visualizationData?.date_entities_list[index]
        ).filter((value) => value !== undefined),
      },
    },
  };

  useEffect(() => {
    const processPeriodData = (periodData, keyExtractor, valueExtractor) => {
      return periodData.map((singlePeriodData) => {
        const metricData = {};
        singlePeriodData.forEach((row) => {
          const key = row[keyExtractor];
          const value = row[valueExtractor];
          metricData[key] = value;
        });
        return metricData;
      });
    };
    // daily data for account level line chart 
    if (visualizationFlags?.overall_daily) {
      const accountDailyData = breakdownData?.map((singlePeriodData) => {
        const dailyMetricArray = new Array(31).fill(0);
        singlePeriodData.forEach((row) => {
          const date = row[headersInfo?.dateColIndex].slice(-2).replace(/^0+/, '');
          const metric = row[category.index];
          dailyMetricArray[Number(date) - 1] = metric;
        });
        return dailyMetricArray;
      });
      setAccountDailyData(accountDailyData);
      // weekly data for account level bar line chart 
    } else if (visualizationFlags?.overall_weekly) {
      const accountWeeklyData = processPeriodData(breakdownData, headersInfo?.weekColIndex, category.index);
      setAccountWeeklyData(accountWeeklyData);
      // monthly data for account level bar line chart  
    } else if (visualizationFlags?.overall_monthly) {
      const accountMonthlyData = processPeriodData(breakdownData, headersInfo?.monthColIndex, category.index);
      setAccountMonthlyData(accountMonthlyData);
      // aggregated data for account level bar line chart 
    } else if (visualizationData?.intent === "overall") {
      const accountAggregatedData = breakdownData?.map((singlePeriodData) => singlePeriodData?.[0]?.[category?.index]);
      setAccountAggregatedData(accountAggregatedData);
      // daily data for campaign level line chart
    } else if (visualizationFlags?.campaign_daily) {
      const campaignDailyData = {};
      campaignNames.forEach((campaignName: string) => {
        const dailyMetricByPeriods = breakdownData?.map((singlePeriodData) => {
          const campaignDailyRows = singlePeriodData.filter((campaignRow) => campaignRow[headersInfo?.campaignColIndex] === campaignName);
          const dailyMetricArray = new Array(31).fill(0);
          campaignDailyRows.forEach((row) => {
            const date = row[headersInfo?.dateColIndex].slice(-2).replace(/^0+/, '');
            dailyMetricArray[Number(date) - 1] = row[category.index];
          });
          return dailyMetricArray;
        });
        campaignDailyData[campaignName] = dailyMetricByPeriods;
      });
      setCampaignDailyData(campaignDailyData);
      // weekly data for campaign level bar chart
    } else if (visualizationFlags?.campaign_weekly) {
      const campaignWeeklyData = {};
      campaignNames.forEach((campaignName: string) => {
        const weeklyMetricByPeriods = processPeriodData(breakdownData, headersInfo?.weekColIndex, category.index);
        campaignWeeklyData[campaignName] = weeklyMetricByPeriods;
      });
      setCampaignWeeklyData(campaignWeeklyData);
      // monthly data for campaign level bar chart
    } else if (visualizationFlags?.campaign_monthly) {
      const campaignMonthlyData = {};
      campaignNames.forEach((campaignName: string) => {
        const monthlyMetricByPeriods = processPeriodData(breakdownData, headersInfo?.monthColIndex, category.index);
        campaignMonthlyData[campaignName] = monthlyMetricByPeriods;
      });
      setCampaignMonthlyData(campaignMonthlyData);
      // Aggregated data for campaign level BAR chart
    } else if (visualizationData?.intent == "campaign_overview") {
      let campaignAggregatedData = {};
      campaignNames.forEach((campaignName) => {
        let aggregatedMetricByPeriods = [];
        breakdownData?.forEach((singlePeriodData) => {
          // There should only be one element in the filtered array
          const campaignAggregatedRows = singlePeriodData.filter(
            (campaignRow) =>
              campaignRow[headersInfo?.campaignColIndex] == campaignName
          );
          aggregatedMetricByPeriods.push(
            campaignAggregatedRows?.[0]?.[category.index]
          );
        });
        campaignAggregatedData[campaignName as string] =
          aggregatedMetricByPeriods;
      });
      setCampaignAggregatedData(campaignAggregatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleDropdownSelect = useCallback(
    (item) => {
      const selectedItem = headersInfo?.dropDownCategoriesAndIndices.find(
        (category) => category?.name === item
      );
      if (selectedItem) {
        setCategory(selectedItem);
      }
    },
    [headersInfo, setCategory]
  );

  return (
    <>
      <div style={{ width: "100%" }} className="adsviserCharts">
        <div className="adsviserCharts__dropdown">
          {breakdownData && (
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle id="dropdown-basic">
                {category.name}
              </Dropdown.Toggle>
              {
                <Dropdown.Menu className="chartsdropDownItem">
                  {Array.from(headersInfo?.dropDownCategoriesAndIndices)?.map(
                    (item, index) => {
                      return (
                        <Dropdown.Item eventKey={item?.name} key={item.index} title={item?.name}>
                          {item?.name}
                        </Dropdown.Item>
                      );
                    }
                  )}
                </Dropdown.Menu>
              }
            </Dropdown>
          )}
        </div>
      </div>

      <div className="line-chart adsviserMixCharts">
        <div className="row">
          <div className="col-12 adsviserMixCharts__inner">
            {accountDailyData && (
              <MainCharts
                chartType="line"
                chartData={{
                  ...templateLineChartConfig,
                  series: accountDailyData.map(
                    (accountDailyMetricArray, index) => ({
                      name: visualizationData?.date_entities_list[index],
                      data: accountDailyMetricArray,
                    })
                  ),
                  options: {
                    ...templateLineChartConfig.options,
                  },
                }}
              />
            )
            }
            {accountAggregatedData && (
              <MainCharts
                chartType="bar"
                chartData={{
                  ...templateBarChartConfig,
                  series: [
                    {
                      name: `Total ${capitalizeFirstLetter(category?.name)}`,
                      data: accountAggregatedData,
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>

      {accountWeeklyData && (
        <div className="adsviserCharts__main  row">
          {visualizationData?.date_entities_list.map((date_entity, index) => {
            return (
              <div className="col-12 adsviserCharts__inner" key={date_entity.toString()}>
                <div style={{ display: "flex" }} className="adsviserCharts__inner--content">
                  <MainCharts
                    chartType="bar"
                    chartData={{
                      ...templateBarChartConfig,
                      series: [
                        {
                          name: `Weekly ${capitalizeFirstLetter(category?.name)}`,
                          data: Object.values(accountWeeklyData[index]),
                        },
                      ],
                      options: {
                        ...templateBarChartConfig.options,
                        xaxis: { categories: Object.keys(accountWeeklyData[index]) },
                        title: { text: 'Interpreted Date Range: ' + date_entity[0].toString() + ' to ' + date_entity[1].toString() }
                      },
                    }}
                  />
                </div>
              </div>);
          })}
        </div>)}

      {accountMonthlyData && (
        <div className="adsviserCharts__main  row">
          {visualizationData?.date_entities_list.map((date_entity, index) => {
            return (
              <div className="col-12 adsviserCharts__inner" key={date_entity.toString()}>
                <div style={{ display: "flex" }} className="adsviserCharts__inner--content">
                  <MainCharts
                    chartType="bar"
                    chartData={{
                      ...templateBarChartConfig,
                      series: [
                        {
                          name: `Monthly ${capitalizeFirstLetter(category?.name)}`,
                          data: Object.values(accountMonthlyData[index]),
                        },
                      ],
                      options: {
                        ...templateBarChartConfig.options,
                        xaxis: { categories: Object.keys(accountMonthlyData[index]).map((month) => MONTHS[Number(month.split("-")[1]) - 1]) },
                        title: { text: 'Interpreted Date Range: ' + date_entity[0].toString() + ' to ' + date_entity[1].toString() }
                      },
                    }}
                  />
                </div>
              </div>);
          })}
        </div>)}

      {campaignDailyData && (
        <div className="adsviserCharts__main  row">
          {campaignNames.map((campaignName: string) => {
            const lineChartConfig = {
              ...templateLineChartConfig,
              series: campaignDailyData[campaignName].map(
                (campaignMetric, index) => ({
                  name: visualizationData?.date_entities_list[index],
                  data: campaignMetric,
                })
              ),
              options: {
                ...templateLineChartConfig.options,
                title: {
                  text: campaignName,
                },
              },
            };
            return (
              <div
                className="col-12 adsviserCharts__inner"
                key={campaignName}
              >
                <div
                  style={{ display: "flex" }}
                  className="adsviserCharts__inner--content"
                >
                  <MainCharts
                    key={campaignName}
                    chartType={"line"}
                    chartData={lineChartConfig}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {campaignWeeklyData && (
        <div className="adsviserCharts__main  row">
          {campaignNames.map((campaignName: string) => {
            return (visualizationData?.date_entities_list.map((date_entity, index) => {
              return (
                <div
                  className="col-12 adsviserCharts__inner"
                  key={campaignName}
                >
                  <div
                    style={{ display: "flex" }}
                    className="adsviserCharts__inner--content"
                  >
                    <MainCharts
                      key={campaignName}
                      chartType="bar"
                      chartData={{
                        ...templateBarChartConfig,
                        series: [{
                          name: `Weekly ${capitalizeFirstLetter(category?.name)}`,
                          data: Object.values(campaignWeeklyData[campaignName][index])
                        }],
                        options: {
                          ...templateBarChartConfig.options,
                          xaxis: { categories: Object.keys(campaignWeeklyData[campaignName][index]) },
                          title: { text: `${campaignName}` },
                          subtitle: { text: `Interpreted Date Range: ${date_entity[0].toString()} to ${date_entity[1].toString()}` }
                        },
                      }}
                    />
                  </div>
                </div>
              );
            }));
          })}
        </div>
      )}

      {campaignMonthlyData && (
        <div className="adsviserCharts__main  row">
          {campaignNames.map((campaignName: string) => {
            return (visualizationData?.date_entities_list.map((date_entity, index) => {
              return (
                <div
                  className="col-12 adsviserCharts__inner"
                  key={campaignName}
                >
                  <div
                    style={{ display: "flex" }}
                    className="adsviserCharts__inner--content"
                  >
                    <MainCharts
                      key={campaignName}
                      chartType="bar"
                      chartData={{
                        ...templateBarChartConfig,
                        series: [{
                          name: `Monthly ${capitalizeFirstLetter(category?.name)}`,
                          data: Object.values(campaignMonthlyData[campaignName][index])
                        }],
                        options: {
                          ...templateBarChartConfig.options,
                          xaxis: { categories: Object.keys(campaignMonthlyData[campaignName][index]).map((month) => MONTHS[Number(month.split("-")[1]) - 1]) },
                          title: { text: `${campaignName}` },
                          subtitle: { text: `Interpreted Date Range: ${date_entity[0].toString()} to ${date_entity[1].toString()}` }
                        },
                      }}
                    />
                  </div>
                </div>
              );
            }));
          })}
        </div>
      )}

      {campaignAggregatedData && (
        <div className="adsviserCharts__main  row">
          {campaignNames.map((campaignName: string) => {
            const barChartConfig = {
              ...templateBarChartConfig,
              series: [
                {
                  name: `Total ${capitalizeFirstLetter(category.name)}`,
                  data: campaignAggregatedData[campaignName],
                },
              ],
              options: {
                ...templateBarChartConfig.options,
                title: {
                  text: campaignName,
                },
              },
            };
            return (
              <div
                className="col-12 adsviserCharts__inner"
                key={campaignName}
              >
                <div
                  style={{ display: "flex" }}
                  className="adsviserCharts__inner--content"
                >
                  <MainCharts
                    key={campaignName}
                    chartType={"bar"}
                    chartData={barChartConfig}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const MemoizedSearchResultChart = React.memo(SearchResultChart);

export default MemoizedSearchResultChart;
