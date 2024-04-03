import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

export default function HedgeHogList() {
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);

  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;

        const json = await res.json();
        setHedgehogs(json?.hedgehogs || []);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: "1em", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: "#a1e6df",
          height: "3em",
          display: "flex",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "darkslategrey" }}>
          Rekisteröidyt siilit
        </Typography>
      </Box>
      {hedgehogs.length ? (
        <Box sx={{ overflowY: "scroll", height: "100%" }}>
          {hedgehogs.map((hedgehog, index: number) => (
            <MenuItem
              sx={{
                height: "3em",
                display: "flex",
                zIndex: 2
              }}
              key={`hedgehog-index-${index}`}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "2em",
                  height: "2em",
                  borderRadius: "50%",
                  marginRight: "1em",
                  backgroundColor: (hedgehog?.gender == 'male') ? "#b4d4ff" : "#fb9ad1"
                }}
              >
              </Box>
                {hedgehog.name}
            </MenuItem>
          ))}
        </Box>
      ) : (
        <Typography sx={{ padding: "1em" }}>
          Tietokannasta ei löytynyt siilejä. Lisää siili oikealla olevalla lomakkeella.
        </Typography>
      )}
    </Paper>
  );
}
