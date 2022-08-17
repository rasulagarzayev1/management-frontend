import React from 'react';

const Table = ({ columns, data }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						{columns.map((column, key) => (
							<th key={key}>
								<div>{column.name}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, key) => (
						<tr key={key}>
							{columns.map((column, key) => (
								<td key={key}>{column.render ? column.render(column.key ? row[column.key] : row) : row[column.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
