/* eslint-disable react/prop-types */
export const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="p-3 bg-slate-700 flex flex-col gap-4 rounded-md">
				<p className="text-medium text-base ">{label}</p>
				<p className="text-sm text-indigo-400">
					Revenue:
					<span className="ml-2">₴{payload[0].value}</span>
				</p>
				<p className="text-sm text-green-400">
					Conducted Lessons:
					<span className="ml-2">{payload[1].value}</span>
				</p>
				<p className="text-sm text-red-400">
					Substituted Lessons:
					<span className="ml-2">{payload[2].value}</span>
				</p>
			</div>
		)
	}

	return null
}
