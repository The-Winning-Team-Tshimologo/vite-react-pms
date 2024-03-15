import React from 'react'
import "./Invoice.css";
import Sidebar from '../sidebar/Sidebar'
import heroImage from "../../assets/cover.jpg"
import Logo from "../../assets/logo.png"
function Invoice() {
  return (
    <> <div className='body'>
    <Sidebar />
 <div className='logo'>
 <img src={Logo} alt="" className="round-image" />
 </div>

 <div class="profile">
<img src={heroImage} alt="" className="round-image" />
       <span>Connie Ferg</span>
   </div>
<div class="menu-dots">
<div class="menu-dot"></div>
<div class="menu-dot"></div>
<div class="menu-dot"></div>
</div>
</div>

<div>
<h1 className='name-holder'>Invoice</h1>

<div class="date">Date: March 12, 2024</div>

<div class="info">
<div class="address">
        <strong>Billed to:</strong><br></br>
        Rea Motho<br></br>
        123 Biccard Street, Braamfontein<br></br>
        hello@reallygreatsite.com
    </div>
    <div class="address-2">
        <strong>From:</strong><br></br>
        Rea Motho<br></br>
        123 Biccard Street, Braamfontein<br></br>
        hello@reallygreatsite.com
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
        <tr>
          <td>Service</td>
          <td>1</td>
          <td>R300</td>
          <td>R300</td>
        </tr>
        <tr>
          <td>Material(Pipes)</td>
          <td>2</td>
          <td>R150</td>
          <td>R150</td>
        </tr>
        <tr>
          <td>System charge</td>
          <td>1</td>
          <td>20%</td>
          <td>R90</td>
        </tr>
      </tbody>
      <tfoot>
        <tr className="total-row">
          <td colSpan="3">Total</td>
          <td>R540</td>
        </tr>
      </tfoot>
    </table>
  
    </div>

<div className='last-part'>
<div><strong>Payment method:</strong> Card</div>
<div><strong>Note:</strong> Thank you for choosing us !</div>

</div>



    </>
   
   
  )
}

export default Invoice
