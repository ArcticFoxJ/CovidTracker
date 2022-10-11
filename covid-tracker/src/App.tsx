import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import { AllData, CountryData, getAll, getCountries, getCountry } from './services/api';

interface ListItem {
  name: string
  value: string
}

function App() {

  const [countries, setCountries] = useState<ListItem[]>([])
  const [country, setCountry] = useState<string>('')
  const [data, setData] = useState<AllData | CountryData>()

  useEffect(() => {
    getCountries(data => {
      setCountries(data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        })
      ))
    })
  }, [])

  useEffect(() => {
    if(country) {
      getCountry(country, data => setData(data))
    }
    else {
      getAll(data => setData(data))
    }
    console.log(data)
  }, [country])
  
  return (
    <React.Fragment>
      <Header title="Covid Tracker" description="daily statistics on the covid-19 virus"/>
      <Container component="main" maxWidth="sm" sx={{ mt: 2 }} >
        
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel required={true} id="country-label">Country</InputLabel>
            <Select labelId="country-label" id="country" value={country} label="Choose..." onChange={(e) => { setCountry(e.target.value) }} >
              <MenuItem value="">Worldwide</MenuItem>
              {
                countries.map((country, i) =>
                  <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>

          {
            data &&
            <div>
              <Typography variant="h4" color="primary">
                {(data as CountryData)?.country || 'Worldwide'}
              </Typography>
    
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <InfoBox title="Cases" count={data.todayCases} total={data.cases}/>
                </Grid>
                <Grid item xs={6} md={4}>
                  <InfoBox title="Recovered" count={data.todayRecovered} total={data.recovered}/>
                </Grid>
                <Grid item xs={6} md={4}>
                  <InfoBox title="Deaths" count={data.todayDeaths} total={data.deaths}/>
                </Grid>
              </Grid>
    
            </div>
          }

      </Container>
      <footer className="text-center"><a href="https://github.com/ArcticFoxJ" target="_blank" rel="noreferrer">@ArcticFoxJ</a> 2022</footer>
    </React.Fragment>
  );
}

export default App;
