import React from 'react';
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Alert,
} from '@material-tailwind/react';
import {
	BsLayoutSidebarInsetReverse,
	BsLayoutSidebarInset,
} from 'react-icons/bs';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NavItem, defaultNavItems } from './defaultNavItems';

type Props = {
	collapsed: boolean;
	navItems?: NavItem[];
	setCollapsed(collapsed: boolean): void;
	shown: boolean;
};
const Sidebar = ({
	collapsed,
	navItems = defaultNavItems,
	shown,
	setCollapsed,
}: Props) => {
	const [open, setOpen] = React.useState(0);
	const [openAlert, setOpenAlert] = React.useState(true);

	const handleOpen = (value: number) => {
		setOpen(open === value ? 0 : value);
	};

	const Icon = collapsed ? BsLayoutSidebarInsetReverse : BsLayoutSidebarInset;

	return (
		<Card
			className={classNames({
				'bg-gradient-to-b from-blue-gray-700 to-gray-900 h-screen w-1/5 fixed p-4 shadow-xl shadow-blue-gray-900/5 text-zinc-50 md:translate-x-0 z-20': true,
				'transition-all duration-300 ease-in-out': true,
				'w-1/5': !collapsed,
				'w-16': collapsed,
				'-translate-x-full': !shown,
			})}
		>
			<div className="mb-2 flex items-center gap-4 p-4">
				<img src="/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
				{!collapsed && (
					<Typography variant="h5" color="white">
						NextJS Dashboard
					</Typography>
				)}
				<button
					className={`${
						collapsed ? 'left-6' : 'right-0'
					} absolute w-10 h-10 rounded-full opacity-0 md:opacity-100`}
					onClick={() => setCollapsed(!collapsed)}
				>
					<Icon className="w-5 h-5 text-blue-gray-50" />
				</button>
			</div>
			{/* {!collapsed && (
				<div className="p-2">
					<Input
						color="blue-gray"
						icon={<MagnifyingGlassIcon className="h-5 w-5" />}
						label="Search"
					/>
				</div>
			)} */}
			<hr className="my-6 border-ds-secondary" />
			<List className="items-stretch">
				{navItems.length > 0 &&
					navItems.map((item, index) => (
						<ListItem
							key={index}
							className={`group text-light-blue-50 ${
								collapsed
									? 'hover:bg-transparent py-3 px-0'
									: 'hover:bg-ds-secondary hover:text-ds-primary'
							}`}
						>
							<ListItemPrefix
								className={collapsed ? 'group-hover:text-ds-secondary' : ''}
							>
								{item.icon}
							</ListItemPrefix>
							{!collapsed && <>{item.label}</>}
						</ListItem>
					))}
			</List>
			{!collapsed && (
				<Alert
					open={openAlert}
					className="mt-auto bg-[#adfa1d] text-green-900 font-poppins"
					onClose={() => setOpenAlert(false)}
				>
					<CubeTransparentIcon className="mb-4 h-12 w-12" />
					<Typography variant="h6" className="mb-1 font-poppins font-extrabold">
						Upgrade to PRO
					</Typography>
					<Typography variant="small" className="font-fira opacity-80">
						Upgrade to Material Tailwind PRO and get even more components,
						plugins, advanced features and premium.
					</Typography>
					<div className="mt-4 flex gap-3">
						<Typography
							as="a"
							href="#"
							variant="small"
							className="font-medium opacity-80 underline underline-offset-2"
							onClick={() => setOpenAlert(false)}
						>
							Dismiss
						</Typography>
						<Typography
							as="a"
							href="#"
							variant="small"
							className="font-extrabold font-poppins"
						>
							Upgrade Now
						</Typography>
					</div>
				</Alert>
			)}
		</Card>
	);
};

export default Sidebar;
