import React from "react";
import "./Payment.css";
import VisaImg from "@/assets/visa.png";
import PaymentCard from "@/assets/payment.png";
import { FaCreditCard, FaCalendar, FaLock } from "react-icons/fa";
import ImageLock from "@/assets/visa.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";

function Payment() {
  return (
    <div>
      <Header />
      <div className="payment-container">
        <div className="payment-details">
          <h1> SERVICE #1646988613_694623663</h1>
          <div className="price-description">
            <p className="price">R1600</p>

            <div className="description">
              <p className="desc-description">Description</p>
              <p>Geyser Leakage</p>
            </div>
          </div>
        </div>

        <div className="select-payment">
          <h2>Select a payment method: </h2>

          <div className="select-payment-container">
            <div className="select-Bank custom-radio">
              <div className="radio-select-bank">
                <input
                  type="radio"
                  className="radio"
                  id="radio-3"
                  name="group"
                />
                <label htmlFor="radio-3">Bank Card</label>
              </div>

              <div className="visa-img">
                <img src={VisaImg} alt="visa image" />
              </div>
            </div>

            <div className="credit-payment">
              <h3>Bank cards</h3>
              <div className="credit-container">
                <div className="radio-credit custom-radio">
                  <input
                    type="radio"
                    className="radio"
                    id="radio-credit"
                    name="group"
                  />
                  <label htmlFor="radio-credit">
                    <img src={PaymentCard} alt="payment card" />
                  </label>
                </div>

                <div className="credit-description">
                  <h2>Credit or debit card (Visa / Mastercard / MIR)</h2>
                  <p>No transaction fees</p>
                </div>
              </div>
            </div>

            {/* Form for payment */}
            <div className="payment-form">
              <form>
                <div className="input-with-icon">
                  <label htmlFor="cardNumber">
                    <FaCreditCard />
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                  />
                </div>

                <div className="input-group">
                  <div className="input-with-icon">
                    <label htmlFor="expiration">
                      <FaCalendar />
                    </label>
                    <input
                      type="text"
                      id="expiration"
                      name="expiration"
                      placeholder="MM / YY"
                    />
                  </div>

                  <div className="input-with-icon">
                    <label htmlFor="cvv">
                      <FaLock />
                    </label>
                    <input type="text" id="cvv" name="cvv" placeholder="CVV" />
                  </div>
                </div>

                <div className="img-lock">
                  <img src={ImageLock} alt="image lock" />
                  <p>Your transaction is secured with SSL encryption</p>
                </div>

                {/* <button type="submit">Pay</button> */}
                <Button variant="custom">Pay</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
