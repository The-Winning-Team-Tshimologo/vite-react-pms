import Header from "@/components/header/Header";
import React from "react";
import JobCompletion from "./components/jobCompletion/JobCompletion";
import MyBarChart from "./components/myBarChart/MyBarChart";
import MyPieChart from "./components/myPieChart/MyPieChart";
import "./ADDashboard.css";
import StatsComponent from "./components/statsBox/StatsComponent";

const ADDashboard = () => {
  // const [barChartData, setBarChartData] = useState([]);
  // const [pieChartData, setPieChartData] = useState([]);
  // const [jobCompletionData, setJobCompletionData] = useState([]);
  // const [statsData, setStatsData] = useState([]);

  // useEffect(() => {
  //   // Simulated fetch requests
  //   const fetchData = async () => {

  //     // fetch data from APIs and set state
  //     setBarChartData(yourBarChartData);
  //     setPieChartData(yourPieChartData);
  //     setJobCompletionData(yourJobCompletionData);
  //     setStatsData(yourStatsData);
  //   };

  //   fetchData();
  // }, []);

  const barChartData = [
    { name: "01", InProgress: 10000, New: 8000 },
    { name: "02", InProgress: 6000, New: 7000 },
    { name: "03", InProgress: 7000, New: 6500 },
    { name: "04", InProgress: 4000, New: 2400 },
    { name: "05", InProgress: 6000, New: 2000 },
    { name: "06", InProgress: 10000, New: 3500 },
    { name: "07", InProgress: 1000, New: 7900 },
    { name: "08", InProgress: 6000, New: 2000 },
    { name: "09", InProgress: 10000, New: 3500 },
    { name: "10", InProgress: 4000, New: 2400 },
    { name: "11", InProgress: 3000, New: 4500 },
    { name: "12", InProgress: 8500, New: 6800 },
  ];

  // const statsData = [
  //   { name: "Number of requests made", value: 250 },
  //   { name: "Number of users on system", value: 100 },
  //   { name: "Number of applications", value: 150 },
  //   { name: "Number of SP per category", value: 5 },
  // ];

  const statsData = [
    {
      label: "Number of requests made",
      value: 50,
      maxValue: 100,
      color: "#ffb200",
      backgroundColor: "#fff5cc",
    },
    {
      label: "Number of users on system",
      value: 12109,
      maxValue: 20000,
      color: "#4339f2",
      backgroundColor: "#dad7fe",
    },
    {
      label: "Number of applications",
      value: 132645,
      maxValue: 200000,
      color: "#02a0fc",
      backgroundColor: "#ccf8fe",
    },
    {
      label: "Number of SP per category",
      value: 100429,
      maxValue: 150000,
      color: "#ff3a29",
      backgroundColor: "#ffe5d3",
    },
  ];

  const jobCompletionData = [
    {
      name: "Sbusiso Mabaso",
      location: "Johannesburg",
      avatar: "/src/assets/sbusisoAvatar.png",
      percent: 90,
    },
    {
      name: "Olivia Arribas",
      location: "Midrand",
      avatar: "/src/assets/oliviaAvatar.png",
      percent: 85,
    },
    {
      name: "Graham Griffiths",
      location: "Centurion",
      avatar: "/src/assets/grahamAvatar.png",
      percent: 70,
    },
  ];

  const pieChartData = [
    { name: "Sbusiso", value: 400, color: "#ff3a29" },
    { name: "Olivia", value: 300, color: "#ffb200" },
    { name: "Graham", value: 300, color: "#4339f2" },
  ];

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <div className="w-fit">
          <MyBarChart
            title="In Progress and New Requests"
            data={barChartData}
          />
        </div>

        <div className="w-fit">
          <StatsComponent
            title="Stats"
            subTitle="PMS’s data collection"
            stats={statsData}
          />
        </div>

        <div className="w-fit">
          <JobCompletion
            title="Job Completion Percentage"
            data={jobCompletionData}
          />
        </div>

        <div className="w-fit">
          <MyPieChart title="Most Job Requests" data={pieChartData} />
        </div>
      </div>
    </>
  );
};

export default ADDashboard;
