import React from 'react';
import { NavLink } from 'react-router-dom';

export default function header() {
	return (
		<ul>
			<li>
				<NavLink to="/" activeclassname="is-active">
					Goals
				</NavLink>
			</li>
			<li>
				<NavLink to="/user-stories" activeclassname="is-active">
					User stories
				</NavLink>
			</li>
			<li>
				<NavLink to="/conflict-management" activeclassname="is-active">
					Manage conflicts
				</NavLink>
			</li>
		</ul>
	);
}
