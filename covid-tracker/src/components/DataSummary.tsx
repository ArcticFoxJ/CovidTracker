import { Grid } from '@mui/material'
import { Data } from '../services/api'
import InfoBox from './InfoBox'

interface DataSummaryProps {
    data: Data
}

const DataSummary = ({data}: DataSummaryProps) => {
  return (
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
  )
}

export default DataSummary
