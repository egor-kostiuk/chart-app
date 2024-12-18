/* eslint-disable react/prop-types */
export const ChoosePeriod = ({ period, onChange }) => {
	return (
		<div className="l-0 mt-10 mb-5">
			<label htmlFor="period-select">Choose period: </label>
			<select
				className="text-black"
				id="period-select"
				value={period}
				onChange={e => onChange(e.target.value)}
			>
				<option value="weekly">Weekly</option>
				<option value="monthly">Monthly</option>
				<option value="quarterly">Quarterly</option>
				<option value="yearly">Yearly</option>
			</select>
		</div>
	)
}
