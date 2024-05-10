import React from "react";
import "./JobCompletion.css";

const ProgressBar = ({ percent, color }) => (
  <div className="flex flex-col ">
    <div style={{ textAlign: "right", color: "#4339f2" }}>{`${percent}%`}</div>
    <div
      style={{
        height: "10px",
        width: "100%",
        backgroundColor: "#dad7fe",
        borderRadius: "5px",
        marginRight: "10px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          backgroundColor: color,
          borderRadius: "5px",
        }}
      />
    </div>
  </div>
);

const JobCompletionItem = ({ name, location, avatar, percent }) => (
  <div className="flex gap-32 w-fit">
    <div className="flex-row gap-10">
      <div>
        <img
          src={avatar}
          alt={name}
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
      </div>
      <div>
        <div style={{ fontWeight: "bold" }}>{name}</div>
        <div>{location}</div>
      </div>
    </div>
    <div className="w-96">
      <ProgressBar percent={percent} color={"#4339f2"} />
    </div>
  </div>
);

const JobCompletion = ({title ,data }) => (
  <>
  <div><h2>{title}</h2></div>
  <div className="flex flex-col gap-32 w-fit">
    {data.map((item, index) => (
      <JobCompletionItem
        key={index}
        name={item.name}
        location={item.location}
        avatar={item.avatar}
        percent={item.percent}
        barColor={item.barColor}
      />
    ))}
  </div>
  </>
);

export default JobCompletion;
