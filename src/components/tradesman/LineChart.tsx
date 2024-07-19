import React, { useEffect, useRef } from "react";
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';

const LineChart = ({ data }) => {
    
    const formattedData = data.labels.map((label, index) => ({
        name: label,
        value: data.values[index],
      }));
    
      return (
        <div className="chart-container" style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <RechartsLineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
              <YAxis tick={{ fontSize: 12 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
};

export default LineChart;
