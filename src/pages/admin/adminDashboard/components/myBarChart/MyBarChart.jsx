import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Customizing the bars of the graph
const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;

  // Adjust the rx and ry values to control the roundness
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="10"
      ry="10"
      fill={fill}
    />
  );
};

// Customizing the XAxis labels
const CustomTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={15} textAnchor="middle" fill="#888" fontSize={10}>
        {`${payload.value} /`} {/* Adding the forward slash after the label */}
      </text>
    </g>
  );
};

// Custom tooltip for multiple data series
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid var(--color-tertiary-opaque)",
          borderRadius: "4px",
          whiteSpace: "nowrap",
        }}
      >
        <p style={{ margin: 0 }}>{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ margin: 0, color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Custom Legend
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        paddingLeft: 0,
      }}
    >
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", marginRight: 10 }}
        >
          <svg height="10" width="20">
            <ellipse cx="10" cy="5" rx="10" ry="5" fill={entry.color} />
          </svg>
          <span style={{ marginLeft: 5 }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const MyBarChart = ({ title, data }) => {
  // Check if data is empty or all values are null/undefined
  const hasData =
    data && data.some((item) => Object.values(item).some((val) => val != null));

  return (
    <>
      <h2>{title}</h2>
      <br />
      {hasData ? (
        <BarChart
          width={750}
          // className="w- d-none d-lg-block "
          height={300}
          data={data}
          // margin={{
          //   top: 20,
          //   right: 30,
          //   left: 20,
          //   bottom: 20,
          // }}
          // barCategoryGap={20}
          barSize={15}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="name"
            tick={<CustomTick />}
            axisLine={false}
            tickLine={false}
          />
          {/* <YAxis /> */}
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <Bar dataKey="InProgress" fill="#15a4fa" shape={<CustomBar />} />
          <Bar dataKey="New" fill="#34b53a" shape={<CustomBar />} />
        </BarChart>
      ) : (
        <div
        >
          <h3 className="flex justify-center">No data collected yet</h3>
        </div>
      )}
    </>
  );
};

export default MyBarChart;
