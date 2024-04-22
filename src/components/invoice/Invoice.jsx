import React from 'react';
import "./Invoice.css";
import Sidebar from '../sidebar/Sidebar';
import heroImage from "../../assets/cover.jpg";
import Logo from "../../assets/pms-logo.png.";
import invoicemockData from '../mockdata/invoicedata';

const Invoice = () => {
  const {
    profileName,
    billedToAddress,
    fromAddress,
    items,
    totalAmount,
    paymentMethod,
    note
  } = invoicemockData; 
  
  return (
    <>
      <div className='body'>
        <Sidebar />
        <div className='logo'>
          <img src={Logo} alt="" className="round-image" />
        </div>

        <div className="profile">
          <img src={heroImage} alt="" className="round-image" />
          <span>{profileName}</span>
        </div>
        <div className="menu-dots">
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
        </div>
      </div>

      <div>
        <h1 className='name-holder'>Invoice</h1>
        <div className="date">Date: March 12, 2024</div>

        <div className="info">
          <div className="address">
            <strong>Billed to:</strong><br />
            {billedToAddress.name}<br />
            {billedToAddress.street}<br />
            {billedToAddress.email}
          </div>
          <div className="address-2">
            <strong>From:</strong><br />
            {fromAddress.name}<br />
            {fromAddress.street}<br />
            {fromAddress.email}
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr className='heading'>
              <th>Item</th>
              <th>Hours</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.hours}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
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
      </div>

      <div className='last-part'>
        <div><strong>Payment method:</strong> {paymentMethod}</div>
        <div><strong>Note:</strong> {note}</div>
      </div>
    </>
  );
}

export default Invoice;


