// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import { Users } from 'react-feather'

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const StatsCard = () => {
  // ** State
  const data = {
    series: [
        {
          name: 'Total Employees',
          data: [28, 40, 36, 52, 38, 60, 55]
        }
      ]
  }

  useEffect(() => {
  }, [])

  return (
    <StatsWithAreaChart
      icon={<Users size={2} />}
      color='primary'
      stats={'2'}
      statTitle='Total Employees'
      series={data.series}
      type='area'
    />
  ) 
}

export default StatsCard
