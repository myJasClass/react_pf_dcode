import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
	const active = { color: 'aqua' };

	return (
		<header className={props.type}>
			<div className='inner'>
				<h1>
					<NavLink exact to='/' activeStyle={active}>
						<img src={props.logoSrc} />
					</NavLink>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink to='/member' activeStyle={active}>
							Member
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeStyle={active}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeStyle={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeStyle={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/location' activeStyle={active}>
							Location
						</NavLink>
					</li>
					<li>
						<NavLink to='/join' activeStyle={active}>
							Join
						</NavLink>
					</li>
				</ul>

				<FontAwesomeIcon icon={faBars} />
			</div>
		</header>
	);
}

export default Header;
