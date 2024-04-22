import React from "react";
import "./Invoice.css";
// import Sidebar from '../sidebar/Sidebar';
import heroImage from "../../assets/cover.jpg";

// import Logo from "../../assets/logo.png";
import invoicemockData from "../mockdata/invoicedata";
import Header from "../header/Header";
import getCurrentDateTime from "@/utils/date";


const Invoice = () => {
  const {
    profileName,
    billedToAddress,
    fromAddress,
    items,
    totalAmount,
    paymentMethod,
    note,
  } = invoicemockData;

  const now = getCurrentDateTime();

  return (
    <>
      <Header />
      <div className="invoice__container">
        <h2 className="invoice__heading">Invoice</h2>
        <div className="date">
          Date: <p>{now}</p>
        </div>

        <div className="info">
          <div className="address">
            <strong>Billed to:</strong>
            <br />
            {billedToAddress.name}
            <br />
            {billedToAddress.street}
            <br />
            {billedToAddress.email}
          </div>
          <div className="address-2">
            <strong>From:</strong>
            <br />
            {fromAddress.name}
            <br />
            {fromAddress.street}
            <br />
            {fromAddress.email}
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr className="heading  ">
              <th >Item</th>
              <th>Hours</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="">{item.hours}</td>
                <td className="">{item.price}</td>
                <td className="">{item.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan="3">Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <div className="last-part">
          <div>
            <strong>Payment method:</strong> {paymentMethod}
          </div>
          <div>
            <strong>Note:</strong> {note}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
