import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

interface PaymentProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Payment: React.FC<PaymentProps> = ({ handleSubmit }) => {
  const [card, setCard] = useState({
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const [cardBrand, setCardBrand] = useState("visa");

  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ event });

    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
    if (name === "number") {
      detectCardBrand(value);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.target.elements;
    const formData = {};

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.tagName === "INPUT") {
        formData[element.name] = element.value;
      }
    }

    handleSubmit(formData);
    const formValues = Object.entries(formData).map(([key, value]) => (
      <div key={key}>
        <strong>{key}: </strong>
        {value}
      </div>
    ));
  };

  const detectCardBrand = (brand: string) => {
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegEx = /^5[1-5][0-9]{14}$/;
    const amexRegEx = /^3[47][0-9]{13}$/;
    const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegEx.test(brand)) {
      setCardBrand("visa");
    } else if (mastercardRegEx.test(brand)) {
      setCardBrand("mastercard");
    } else if (amexRegEx.test(brand)) {
      setCardBrand("amex");
    } else if (discoverRegEx.test(brand)) {
      setCardBrand("discover");
    } else {
      setCardBrand("");
    }
  };

  console.log({ cardBrand });

  return (
    <Box>
      <form onSubmit={handleSubmitForm}>
        <Box mb={2}>
          <Typography variant='h6'>Payment</Typography>
        </Box>
        <Box mb={2}>
          <TextField
            label='Card Number'
            type='number'
            name='number'
            value={card.number}
            onChange={handleCardChange}
          />
          <Box>Use this for VISA : 4123456789012345</Box>
        </Box>
        <Box mb={2}>
          <TextField
            label='Expiry Month'
            type='number'
            name='expMonth'
            value={card.expMonth}
            onChange={handleCardChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label='Expiry Year'
            type='number'
            name='expYear'
            value={card.expYear}
            onChange={handleCardChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label='Card Holder Name'
            name='cvc'
            type='text'
            value={card.cvc}
            onChange={handleCardChange}
          />
        </Box>
        <Box mb={2}>
          <Cards
            expiry={`${card.expMonth}/${card.expYear}`}
            name={card.cvc}
            cvc={card.cvc}
            number={card.number}
            issuer={cardBrand}
          />
        </Box>
        <Box mb={2}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Payment;
