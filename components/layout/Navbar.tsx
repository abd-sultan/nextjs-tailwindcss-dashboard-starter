import React from 'react';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa';
import {
	MobileNav,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Card,
	IconButton,
} from '@material-tailwind/react';
import {
	CubeTransparentIcon,
	UserCircleIcon,
	CodeBracketSquareIcon,
	Square3Stack3DIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	InboxArrowDownIcon,
	LifebuoyIcon,
	PowerIcon,
	RocketLaunchIcon,
	Bars2Icon,
} from '@heroicons/react/24/outline';

// profile menu component
const profileMenuItems = [
	{
		label: 'My Profile',
		icon: UserCircleIcon,
	},
	{
		label: 'Edit Profile',
		icon: Cog6ToothIcon,
	},
	{
		label: 'Inbox',
		icon: InboxArrowDownIcon,
	},
	{
		label: 'Help',
		icon: LifebuoyIcon,
	},
	{
		label: 'Sign Out',
		icon: PowerIcon,
	},
];

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="User Profile"
						className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
						src=""
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<MenuItem
							key={label}
							onClick={closeMenu}
							className={`flex items-center gap-2 rounded ${
								isLastItem
									? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
									: ''
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
								strokeWidth: 2,
							})}
							<Typography
								as="span"
								variant="small"
								className="font-normal"
								color={isLastItem ? 'red' : 'inherit'}
							>
								{label}
							</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}

type Props = {
	onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
	return (
		<nav
			className={classNames({
				'bg-white text-beyd-dark-blue': true,
				'flex items-center justify-between': true,
				'w-full md:max-w-full sticky z-10 border-white h-[73px] top-0 border-none': true,
			})}
		>
			<div className="font-bold text-lg ml-6 font-poppins text-ds-primary">
				NextJS Admin Dashboard
			</div>
			<div className="flex-grow">
				<ProfileMenu />
			</div>
			<button className="md:hidden" onClick={props.onMenuButtonClick}>
				<FaBars className="h-6 w-6" />
			</button>
		</nav>
	);
};

export default Navbar;
