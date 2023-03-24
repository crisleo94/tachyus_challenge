import Chart from 'chart.js/auto'
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'

export default function LinearChart({ data }) {
  const chartRef = useRef()

  useEffect(() => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Oil',
          data: [],
          borderColor: 'red',
          fill: false
        },
        {
          label: 'Water',
          data: [],
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Gas',
          data: [],
          borderColor: 'green',
          fill: false
        },
        {
          label: 'Water Injection',
          data: [],
          borderColor: 'orange',
          fill: false
        }
      ]
    }
  
    const oilData = []
    const waterData = []
    const gasData = []
    const waterInjData = []
  
    data.forEach(entry => {
      chartData.labels.push(`${entry.Year}-${entry.Month}`)
      oilData.push(parseFloat(entry.Qo))
      waterData.push(parseFloat(entry.Qw))
      gasData.push(parseFloat(entry.Qg))
      waterInjData.push(parseFloat(entry.Qs))
    })
  
    chartData.datasets[0].data = oilData
    chartData.datasets[1].data = waterData
    chartData.datasets[2].data = gasData
    chartData.datasets[3].data = waterInjData
  
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Oil, Water, Gas, and Water Injection Rates Over Time'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Rate'
          }
        }
      }
    }
  
    const chartRefCurrent = chartRef.current
    const infoChart = new Chart(chartRefCurrent, {
      type: 'line',
      data: chartData,
      options: chartOptions
    })

    return () => {
      infoChart.destroy()
    }
  }, [data])

  return (
    <Container fluid>
      <canvas ref={chartRef} />
    </Container>
  )
}
