import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import CustomerTable from "../components/CustomerTable";
import ReactButton from "../components/ReactButton";

const Home = () => {
  const [customersList, setCustomerList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [showAccountList, setShowAccountList] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  useEffect(() => {
    try {
      getCustomer();
      getTransactionBelowAmt();
      getProductList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTransactionBelowAmt = async () => {
    const response = await axios.get(
      "http://localhost:5000/accounts_below_5000"
    );
    const data = response.data;
    setAccountList(data);
  };

  const getProductList = async () => {
    const response = await axios.get("http://127.0.0.1:5000/distinct-products");
    const data = response.data;
    setProductList(data);
  };

  const getCustomer = async () => {
    const resposne = await axios.get("http://127.0.0.1:5000/customer");
    const data = resposne.data;
    setCustomerList(data);
  };

  return (
    <MainLayout>
      <h1 className="text-center">Customer List</h1>
      <div className="container">
        <CustomerTable customersList={customersList} />
        <div className="d-flex gap-4 justify-content-between">
          <div className="flex-grow-1">
            <ReactButton
              reactBtnOuterDiv={"w-100"}
              btnText={"Get Transaction Below 5000"}
              btnClass="btn-danger w-100"
              onClickfn={() => setShowAccountList(!showAccountList)}
            />
            {showAccountList && accountList && (
              <ul className="list-group mt-2 list-group-numbered">
                {accountList.map((acc) => (
                  <li
                    key={acc._id}
                    className="list-group-item list-group-item-dark"
                  >
                    Account Number {acc.accountNumber}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-grow-1">
            <ReactButton
              btnText={"Get Distinct Product"}
              btnClass="btn-dark w-100"
              onClickfn={() => setShowProductList(!showProductList)}
            />
            {showProductList && productList && (
              <ul className="list-group mt-2 list-group-numbered">
                {productList.map((p, i) => (
                  <li key={i} className="list-group-item list-group-item-dark">
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
