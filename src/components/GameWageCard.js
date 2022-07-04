import { Card, CardContent, Typography, Slider } from "@mui/material";
import { useState } from "react";

export default function GameWageCard({ totalHours, sx }) {
  const [wage, setWage] = useState(15);

  return (
    <Card sx={sx}>
      <CardContent>
        <Slider
          // size="small"
          value={wage}
          max={300}
          onChange={(e) => setWage(e.target.value)}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        <Typography variant="h5">
          If you made ${wage} per hour, you could have made
        </Typography>
        {/* <Typography variant="h5">
          If grinded for ${wage} per hour, you could have made
        </Typography> */}
        <Typography variant="h3">${wage * totalHours}</Typography>
      </CardContent>
    </Card>
  );
}
