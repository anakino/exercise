import { Paper, Typography } from "@mui/material";
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


  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    >
      <Typography>
        TODO: Esitä tässä komponentissa haluamallasi tavalla yksittäisen, tällä
        hetkellä valittuna olevan, siilin tiedot. Siili valitaan
        vasemmanpuoleisesta listauksesta. Kartalla esitetään valitun siilin
        sijainti karttamerkin avulla.
      </Typography>
      <br />
      <Typography>
        Komponentille välitetään React propertynä yksittäisen siilin ID, jonka
        muuttuessa ko. siilin tiedot haetaan rajapinnalta.
      </Typography>
      <br />
    </Paper>
  );
}
