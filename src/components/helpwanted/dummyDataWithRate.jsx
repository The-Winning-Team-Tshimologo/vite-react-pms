import {
    johnSmithImage,
    emilyJohnsonImage,
    michaelWilliamsImage,
    sarahBrownImage,
    davidDavisImage,
    jessicaGarciaImage
} from '../../pages/serviceProvider/jobRequest/images.js';

const dummyData = [
    {
        firstName: "John",
        lastName: "Smith",
        address: "123 Main St,",
        city: "Cityville",
        service: "Plumbing",
        profilePicture: johnSmithImage,
        rate: { numerator: 4, denominator: 5 } // 4/5
    },
    {
        firstName: "Emily",
        lastName: "Johnson",
        address: "456 Elm St,",
        city: "Townsville",
        service: "Electrician",
        profilePicture: emilyJohnsonImage,
        rate: { numerator: 3, denominator: 5 } // 3/5
    },
    {
        firstName: "Michael",
        lastName: "Williams",
        address: "789 Oak St,",
        city: "Villagetown",
        service: "Housekeeping",
        profilePicture: michaelWilliamsImage,
        rate: { numerator: 4, denominator: 5 } // 4.5/5
    },
    {
        firstName: "Sarah",
        lastName: "Brown",
        address: "101 Pine St,",
        city: "Hamletville",
        service: "Plumbing",
        profilePicture: sarahBrownImage,
        rate: { numerator: 3, denominator: 5 } // 3/5
    },
    {
        firstName: "David",
        lastName: "Davis",
        address: "202 Cedar St,",
        city: "Suburbia",
        service: "Electrician",
        profilePicture: davidDavisImage,
        rate: { numerator: 5, denominator: 5 } // 5/5
    },
    {
        firstName: "Jessica",
        lastName: "Garcia",
        address: "303 Maple St,",
        city: "Ruralville",
        service: "Housekeeping",
        profilePicture: jessicaGarciaImage,
        rate: { numerator: 2, denominator: 5 } // 2.5/5
    }

];

export default dummyData;
