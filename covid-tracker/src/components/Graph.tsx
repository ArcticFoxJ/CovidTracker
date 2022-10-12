import { PlotType } from 'plotly.js'
import Plot from 'react-plotly.js'

interface GraphProps {
    title: string
    type?: PlotType
    dates: Date[]
    counts: number[]
}

const Graph = ({title, type = "scatter", dates, counts}: GraphProps) => {
  return (
    <Plot 
      data={[
        {
          x: dates,
          y: counts,
          type: type
        }
      ]}
      layout={{
        title: title
      }}
    />
  )
}

export default Graph
