import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { PieChart, Pie, Tooltip } from "recharts";

const Page1 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      const res = await axios.get("http://localhost:3004/data01", {
        cancelToken: source.token,
      });
      setList(res.data);
      setIsLoading(false);
    };
    fetchData();
    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  return (
    <div>
      <Link to={"/"}>
        <button>Go To Page 1</button>
      </Link>

      {isLoading ? (
        "Loading"
      ) : (
        <PieChart width={1000} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={list}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
};

export default Page1;
