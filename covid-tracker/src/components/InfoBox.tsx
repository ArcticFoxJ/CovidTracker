import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

interface InfoBoxProps {
    title: string
    count: number
    total: number
}

const InfoBox = (props: InfoBoxProps) => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography color="text.secondary">
          {props.title}
        </Typography>
        <Typography variant="h4" color="primary">
          {props.count}
        </Typography>
        <Typography color="text.secondary">
            {props.total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
