import {
  Button, Box, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography
} from "@mui/material";

interface Props {
  coordinates: number[];
}

export function HedgehogForm({ coordinates }: Props) {
  console.log(coordinates);

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
        <TextField></TextField>
        <FormLabel required>Ikä</FormLabel>
        <TextField type="number"></TextField>
        <FormLabel id="gender-radio-buttons-group-label">Sukupuoli</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-radio-buttons-group-label"
          defaultValue="female"
          name="gender-radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <Button variant="contained">Submit</Button>
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
