import { Box, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
  hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {

  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);

  useEffect(() => {
    if (hedgehogId == null) {
      return;
    }

    fetchHedgehog(hedgehogId).then( hedgehog => {
      setHedgehog(hedgehog);
    })
    .catch(err => {
      console.error(`Error while fetching hedgehog: ${err}`);
      setHedgehog(null);
    })
  }, [hedgehogId]);

  /**
   * Fetch hedgehog by id from server
   *
   * @param id number
   * @returns Hedgehog data or null
   */
  const fetchHedgehog = async (id: number) => {
    const response = await fetch(`/api/v1/hedgehog/${id}`);

    if(!response.ok) {
      throw new Error(`Fetch failed for id: ${id}`);
    }

    const jsonData = await response.json();

    return jsonData?.hedgehog[0];
  }


  /**
   * Get info component with label and text
   *
   * @param label string
   * @param text string
   * @returns Component
   */
  function getInfoComponent(label: string, text:string) {
    return (
      <Box sx={{
        height: "1em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
        margin: "1em 0em 1em 0em"
      }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
        <Typography>
          {text = text ?? "ei tiedossa"}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    >
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
        <Typography sx={{fontSize: 18}}>
          Tiedot
        </Typography>
      </Box>
      {hedgehog ? (
        <Box>
          {getInfoComponent("Nimi", hedgehog.name)}
          {getInfoComponent("Ikä", String(hedgehog.age))}
          {getInfoComponent("Sukupuoli", hedgehog.gender)}
        </Box>
      ) : (
        <Box sx={{
          height: "2em",
          display: "flex",
          alignItems: "center",
          margin: "1em 0em 1em 0em"
        }}>
          <Typography>
            Valitse siili vasemmanpuoleisesta listauksesta.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
