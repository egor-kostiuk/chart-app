import { useState } from 'react'
import {
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
} from 'recharts'

import DataFormatter from '../../utils/DateFormatter'
import data from '../../helpers/data.json'
import { ChoosePeriod } from './ChoosePeriod'
import { CustomTooltip } from './CustomTooltip'

export const ChartComponent = () => {
  const [period, setPeriod] = useState('monthly')

  const formattedData = DataFormatter({ data, period })

  return (
    <div className="bg-slate-800 flex flex-col items-center">
      <div>
        <ChoosePeriod value={period} onChange={setPeriod} />
      </div>

      <div className="w-[750px] h-[300px]">
        <ResponsiveContainer>
          <ComposedChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />

            <YAxis yAxisId="left" orientation="left" />
            <Bar dataKey="amount" fill="#4e3cab" yAxisId="left" />

            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 'dataMax']}
              axisLine={false}
              tickLine={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conductedLessons"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="substitutedLessons"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


