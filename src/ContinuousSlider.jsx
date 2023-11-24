import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import beepAlert from "./audio/beep.mp3";

const alert = new Audio(beepAlert);

export default function ContinuousSlider() {
  const [value, setValue] = React.useState(30);

  function handleSetVolume() {
    alert.volume = value / 100;
    alert.play();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          onMouseUp={() => handleSetVolume()}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
}
