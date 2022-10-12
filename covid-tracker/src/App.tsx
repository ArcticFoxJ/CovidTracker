import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { AllData, CountryData, getAll, getAllHistorical, getCountries, getCountry, getCountryHistorical, HistoricalDates } from './services/api';
import DataSummary from './components/DataSummary';
import Footer from './components/Footer';
import Graph from './components/Graph';

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
  
  const getDatesFromData = (data: object): Date[] => {
    return Object.keys(data).map(date => {
      const [month, day, year] = date.split('/')
      return new Date(+year+2000, +month - 1, +day)
    })
  }
  
  const getCountsFromData = (data: object): number[] => {
    return Object.values(data)
  }

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
            <Typography align="center" variant="h3" color="primary">
              {(data as CountryData)?.country || 'Worldwide'}
            </Typography>
          }

          {
            data &&
            <DataSummary data={data} />
          }

          {
            historicalData ?
            <div>
              <div style={{width: "50%", display: "inline-block"}}>
              <Graph 
                title='Historical Cases' 
                dates={getDatesFromData(historicalData.cases)} 
                counts={getCountsFromData(historicalData.cases)} 
              />
              </div>
              <div style={{width: "50%", display: "inline-block"}}>
              <Graph 
                title='Historical Deaths' 
                dates={getDatesFromData(historicalData.deaths)} 
                counts={getCountsFromData(historicalData.deaths)} 
              />
              </div>
            </div>:
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <CircularProgress color="primary" />
            </Box>
          }

      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
