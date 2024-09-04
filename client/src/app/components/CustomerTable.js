import axios from "axios";
import React, { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";

const CustomerTable = ({ customersList }) => {
  const [id, setId] = useState();
  const [error, setError] = useState("");
  const [accNum, setAccNum] = useState();
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    try {
      if (id) {
        getTransaction(id);
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  }, [id]);

  const getTransaction = async (id) => {
    const resposne = await axios.get(`http://localhost:5000/transaction/${id}`);
    const data = resposne.data;
    setTransactionData(data);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Address</th>
            <th scope="col">Customer Accounts</th>
          </tr>
        </thead>
        <tbody>
          {customersList &&
            customersList.map((customer, index) => {
              return (
                <tr key={customer._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>
                    <ul className="account_num_list ">
                      {customer?.accounts?.map((a) => (
                        <li
                          role="button"
                          className="account_num list-group-item"
                          key={a._id}
                          onClick={() => {
                            setId(a._id);
                            setAccNum(a.accountNumber);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          {a.accountNumber}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <TransactionModal
        transactionData={transactionData}
        accNum={accNum}
        modalId={"exampleModal"}
      />
    </div>
  );
};

export default CustomerTable;
