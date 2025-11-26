import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  // const [isOrder, setIsOrder] = useState(false);

  const url = "http://localhost:3002/allOrders";

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(url);
      setAllOrders(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="orders">
      <div className="no-orders">
        <p>{`You have placed ${
          allOrders.length != 0 ? allOrders.length : "0"
        } orders today`}</p>
        {/* <button className="btn btn-primary">Get started</button> */}
        <div className="ordersData">
          <table style={{ border: "2px" }}>
            <thead>
              <tr>
                <th>name of company</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((stock, index) => {
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
