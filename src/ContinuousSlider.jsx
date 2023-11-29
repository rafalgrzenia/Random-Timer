import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import beepAlert from "./audio/beep.mp3";

export const alertSound = new Audio(beepAlert);

export default function ContinuousSlider({ volume, setVolume }) {
  function handleCheckVolume() {
    alertSound.play();
  }
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
          onMouseUp={() => handleCheckVolume()}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
}
