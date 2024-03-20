// import React from 'react'
// import './StatsBox.css'

// const StatsBox = ({ title,subTitle, data }) => (
//     <div className="stats-box">
//       <h2>{title}</h2>
//       <p>{subTitle}</p>
//       {data.map((item, index) => (
//         <div key={index} className="stat-item">
//           <span className="stat-name">{item.name}</span>
//           <progress value={item.value} max="100"></progress>
//         </div>
//       ))}
//     </div>
//   );

// export default StatsBox

import React from "react";

// You can create a separate ProgressBar component for reusability
export const ProgressBar = ({ value, max, color, _backgroundColor }) => {
  // Calculate the width of the filled part of the bar as a percentage
  const width = `${(value / max) * 100}%`;

  return (
    <div
      style={{ background: _backgroundColor, borderRadius: "8px", overflow: "hidden" }}
    >
      <div
        style={{
          height: "10px",
          width: width,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

const StatsComponent = ({ title, subTitle, stats }) => {
  return (
    <div
      // style={{
      //   padding: "20px",
      //   background: "#fff",
      //   borderRadius: "12px",
      //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      // }}
      className="flex flex-col gap-10 w-80"
    >
      <div>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex flex-grow justify-between">
              <span>{stat.label}</span>
              <span style={{color: stat.color}}>{stat.value.toLocaleString()}</span>
            </div>
            <ProgressBar value={stat.value} max={stat.maxValue} color={stat.color} _backgroundColor={stat.backgroundColor}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsComponent;
