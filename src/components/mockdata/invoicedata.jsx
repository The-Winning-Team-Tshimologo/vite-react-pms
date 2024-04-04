
const invoicemockData = {
    profileName: "Connie Ferg",
    billedToAddress: {
      name: "Rea Motho",
      street: "123 Biccard Street, Braamfontein",
      email: "hello@reallygreatsite.com"
    },
    fromAddress: {
      name: "Rea Motho",
      street: "123 Biccard Street, Braamfontein",
      email: "hello@reallygreatsite.com"
    },
    items: [
      { name: "Service", hours: 1, price: "R300", amount: "R300" },
      { name: "Material(Pipes)", hours: 2, price: "R150", amount: "R150" },
      { name: "System charge", hours: 1, price: "20%", amount: "R90" }
    ],
    totalAmount: "R540",
    paymentMethod: "Card",
    note: "Thank you for choosing us!"
  };
  
  export default invoicemockData;
  