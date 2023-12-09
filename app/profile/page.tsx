import React from "react";
import { Box, Typography } from "@mui/material";

interface ProfileProps {
  name?: string;
  gender?: string;
  dob?: string;
}

const Profile: React.FC<ProfileProps> = ({ name, gender, dob }) => {
  return (
    <div style={{ backgroundColor: "white", color: "black", height: "100%" }}>
      <Box>
        <Box mb={2}>
          <Typography variant='h6'>Profile</Typography>
        </Box>
        <Box mb={2}>
          <Typography>Name:</Typography>
          <Typography>{name ?? "Joe Doe"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>Gender:</Typography>
          <Typography>{gender ?? "Male"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>Date of Birth:</Typography>
          <Typography>{dob ?? "20-10-1990"}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
