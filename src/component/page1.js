import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Page1 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const renderTableHeader = () => {
    return Object.keys(list[0]).map((attr) => (
      <th style={{ paddingRight: "30px" }} key={attr}>
        {attr.toUpperCase()}
      </th>
    ));
  };

  const renderTableRows = () => {
    return list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      const res = await axios.get("http://localhost:3004/users", {
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
      <Link to={"/page2"}>
        <button>Go To Page 2</button>
      </Link>

      {isLoading ? (
        "Loading"
      ) : (
        <div>
          <h2>User List</h2>
          <table>
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page1;
