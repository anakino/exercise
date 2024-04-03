import {
  Button, Box, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import { useState } from "react";

interface Props {
  coordinates: number[];
}

interface FormValues {
  name?: string;
  age?: number;
  gender?: string;
}

export function HedgehogForm({ coordinates }: Props) {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    age: 0,
    gender: ""
  });
  // TODO Change FormValues to Hedgehog

  /**
   * Handle form field changes
   */
  const handleFormFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async () => {
    const response = await fetch('/api/v1/hedgehog/add', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      },
    })
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
        alignItems: "center"
      }}
    >
      <Typography sx={{fontSize: 18}}>
        Lisää uusi siilihavainto
      </Typography>
    </Box>
    <FormControl sx={{
        padding: "1em",
        display: "flex",
        justifyContent: "center"
      }}>
        <FormLabel required>Nimi</FormLabel>
        <TextField
          name="name"
          onChange={handleFormFieldChange}
          ></TextField>
        <FormLabel required>Ikä</FormLabel>
        <TextField
          name="age"
          type="number"
          onChange={handleFormFieldChange}
          ></TextField>
        <FormLabel>Sukupuoli</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-radio-buttons-group-label"
          defaultValue="female"
          name="gender"
          onChange={handleFormFieldChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <FormLabel>Klikkaa karttaa tallentaaksesi sijainnin</FormLabel>
        <Typography>
          {coordinates[0] + ' , ' + coordinates[1]}
          </Typography>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
          >
          Tallenna
        </Button>
    </FormControl>
      <Typography sx={{ padding: "1em" }}>
        Siililtä kysyttävät tiedot: nimi, ikä, sukupuoli. Lisäksi siilin
        havainnon yhteydessä merkitään havainnon sijainti kartalla. Kartalta
        saadaan koordinaattipiste tälle HedgehogForm:lle klikkaamalla karttaa
        (kts. consolin logit). Tämä koordinaattipiste tulee tallentaa
        tietokantaan muiden tietojen oheen. PostGIS tarjoaa koordinaateille
        sopivan tietokantatyypin koordinaattien tallennukseen. Yllä olevat
        tiedot tulee tallentaa tietokantaan sopivalla HTTP pyynnöllä siilien
        tietokantaan.
      </Typography>
    </Paper>
  );
}
