/* eslint-disable react/prop-types */
export const ChoosePeriod = ({ period, onChange }) => {
	return (
		<div className="flex flex-col gap-3 mt-7 mb-5">
			<label
				htmlFor="period-select"
				className="text-white font-semibold text-lg"
			>
				Choose period:
			</label>
			<select
				className="cursor-pointer bg-slate-800 text-white py-2 px-4 rounded-md border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				id="period-select"
				value={period}
				onChange={(e) => onChange(e.target.value)}
			>
				<option value="weekly">Weekly</option>
				<option value="monthly">Monthly</option>
				<option value="quarterly">Quarterly</option>
				<option value="yearly">Yearly</option>
			</select>
		</div>
	)
}
