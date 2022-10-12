import { Box, Card, CardContent, CardHeader, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import { AllData, CountryData, CountryHistoricalData, getAll, getAllHistorical, getCountries, getCountry, getCountryHistorical, HistoricalDates } from './services/api';
import Plot from 'react-plotly.js';

interface ListItem {
  name: string
  value: string
}

function App() {

  const [countries, setCountries] = useState<ListItem[]>([])
  const [country, setCountry] = useState<string>('')
  const [data, setData] = useState<AllData | CountryData>()
  const [historicalData, setHistoricalData] = useState<HistoricalDates>()

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
    setData(undefined)
    setHistoricalData(undefined)
    if(country) {
      getCountry(country, data => setData(data))
      getCountryHistorical(country, data => setHistoricalData(data.timeline))
    }
    else {
      getAll(data => setData(data))
      getAllHistorical(data => setHistoricalData(data))
    }
    console.log(historicalData)
  }, [country])
  
  return (
    <React.Fragment>
      <Header title="Covid Tracker" description="daily statistics on the covid-19 virus"/>
      <Container maxWidth="sm">
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
      </Container>
      <Container component="main" maxWidth="lg" sx={{ mt: 2 }} >
          {
            data &&
            <div>
              <Typography align="center" variant="h3" color="primary">
                {(data as CountryData)?.country || 'Worldwide'}
              </Typography>
    
              <Grid container spacing={2} sx={{ mb: 3 }}>
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

          {
            historicalData ?
            <div>
              <div style={{width: "50%", display: "inline-block"}}>
              <Plot 
                data={[
                  {
                    x: Object.keys(historicalData.cases).map(date => {
                      const [month, day, year] = date.split('/')
                      return new Date(+year+2000, +month - 1, +day)
                    }) as Date[],
                    y: Object.values(historicalData.cases) as number[],
                    type: 'scatter'
                  }
                ]}
                layout={{
                  title: 'Historical Cases'
                }}
              />
              </div>
              <div style={{width: "50%", display: "inline-block"}}>
              <Plot 
                data={[
                  {
                      x: Object.keys(historicalData.deaths).map(date => {
                        const [month, day, year] = date.split('/')
                        return new Date(+year+2000, +month - 1, +day)
                      }) as Date[],
                      y: Object.values(historicalData.deaths) as number[],
                      type: 'scatter'
                  }
                ]}
                layout={{
                  title: 'Historical Deaths'
                }}
              />
              </div>
            </div>:
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <CircularProgress color="primary" />
            </Box>
          }

      </Container>
      <footer className="text-center"><a href="https://github.com/ArcticFoxJ" target="_blank" rel="noreferrer">@ArcticFoxJ</a> 2022</footer>
    </React.Fragment>
  );
}

export default App;
