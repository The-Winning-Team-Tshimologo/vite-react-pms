import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./MyPieChart.css";

const MyPieChart = ({ title, data }) => (
  <div>
    
    <div className="flex flex-col">
    <h2>{title}</h2>
      <PieChart width={400} height={350}>
        <Pie data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" stroke="none">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  </div>
);

export default MyPieChart;
