import React from 'react';
import { FaCalendar, FaFolder, FaHome, FaUserFriends } from 'react-icons/fa';

// define a NavItem prop
export type NavItem = {
	label: string;
	href: string;
	icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <FaHome className="w-5 h-5" />,
	},
	{
		label: 'Team',
		href: '/team',
		icon: <FaUserFriends className="w-5 h-5" />,
	},
	{
		label: 'Projects',
		href: '/projects',
		icon: <FaFolder className="w-5 h-5" />,
	},
	{
		label: 'Calendar',
		href: '/calendar',
		icon: <FaCalendar className="w-5 h-5" />,
	},
];
