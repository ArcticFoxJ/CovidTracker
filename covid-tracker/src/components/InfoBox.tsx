import { Card, CardContent, Typography } from '@mui/material';

interface InfoBoxProps {
    title: string
    count: number
    total: number
}

const InfoBox = ({title, count, total}: InfoBoxProps) => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography color="text.secondary" align="center">
          {title}
        </Typography>
        <Typography variant="h4" color="primary" align="center">
          {count}
        </Typography>
        <Typography color="text.secondary" align="center">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
