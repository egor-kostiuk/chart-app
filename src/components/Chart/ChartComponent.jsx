import { useState, useEffect, useMemo, useCallback } from 'react'
import {
	Line,
	Bar,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ComposedChart,
	Legend,
} from 'recharts'

import { DataFormatter } from '../../utils/DataFormatter'
import { ChoosePeriod } from './ChoosePeriod'
import { CustomTooltip } from './CustomTooltip'
import { validateData } from '../../utils/ValidateData'
import data from '../../helpers/data.json'

export const ChartComponent = () => {
	const [period, setPeriod] = useState('weekly')
	const [formattedData, setFormattedData] = useState(null)
	const [error, setError] = useState(null)

	const processedData = useMemo(() => {
		try {
			const dataResult = DataFormatter({ data, period })
			if (!validateData(dataResult)) {
				throw new Error('Incorrect data in the file data.json')
			}
			setError(null)
			return dataResult
		} catch (err) {
			setError(err.message)
			return null
		}
	}, [period])

	const handlePeriodChange = useCallback(newPeriod => {
		setPeriod(newPeriod)
	}, [])

	useEffect(() => {
		setFormattedData(processedData)
	}, [processedData])

	return (
		<>
			{error && (
				<div className="flex justify-center text-red-500">{`${error}`}</div>
			)}

			{formattedData && !error && (
				<div className="bg-slate-800 flex flex-col items-center">
					<div className="flex flex-col items-center">
						<ChoosePeriod value={period} onChange={handlePeriodChange} />
						{period === 'weekly' && <div>weekly</div>}
					</div>
					<div className="w-full md:w-[750px] h-[300px] custom-height ">
						<ResponsiveContainer>
							<ComposedChart data={formattedData}>
								<CartesianGrid
									strokeDasharray="3 3"
									horizontal
									vertical={false}
								/>
								<XAxis dataKey="name" />
								<Tooltip content={<CustomTooltip />} />
								<YAxis
									yAxisId="left"
									orientation="left"
									tickFormatter={value => `₴${value.toLocaleString()}`}
								/>
								<Legend />
								<Bar
									name="revenue"
									dataKey="amount"
									fill="#4e3cab"
									yAxisId="left"
								/>
								<YAxis
									yAxisId="right"
									orientation="right"
									domain={[0, 'dataMax']}
									axisLine={false}
									tickLine={false}
								/>
								<Line
									name="conducted lessons"
									yAxisId="right"
									type="monotone"
									dataKey="conductedLessons"
									stroke="#82ca9d"
									activeDot={{ r: 4 }}
								/>
								<Line
									name="substituted lessons"
									yAxisId="right"
									type="monotone"
									dataKey="substitutedLessons"
									stroke="#ff7300"
									activeDot={{ r: 4 }}
								/>
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</div>
			)}
		</>
	)
}
