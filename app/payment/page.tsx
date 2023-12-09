"use client";

import React, { useState } from "react";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import Profile from "../profile/page";
import Payment from "../components/payment";

interface PaymentPageProps {
  isOpen: boolean;
  toggle: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ isOpen, toggle }) => {
  const { register, handleSubmit } = useForm();
  const stripe = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  const [formValues, setFormValues] = useState({});

  const onSubmit = (data: {
    number: string;
    expMonth: string;
    expYear: string;
    cvc: string;
  }) => {
    setFormValues(data);
  };

  console.log({ formValues });

  return (
    <div style={{ backgroundColor: "white", color: "black" }}>
      <Box p={4}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggle}
            >
              <Menu
                id='menu-appbar'
                anchorEl={isOpen ? null : undefined}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onChange={toggle}
                open={isOpen}
              >
                <MenuItem>
                  <Link href='/profile'>Profile</Link>
                </MenuItem>
                <MenuItem>Payment</MenuItem>
              </Menu>
              <Box ml={2}>
                <Typography variant='h6'>Payment</Typography>
              </Box>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box display={"flex"}>
          <Box mt={2} minWidth={"40%"}>
            <Profile
              {...formValues}
              dob='12-2-1990'
              gender='Male'
              name={formValues.cvc}
              key={"1"}
            />
          </Box>
          <Box mt={2} minWidth={"48%"}>
            <Payment handleSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PaymentPage;
