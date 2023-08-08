'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import React, { useState } from 'react';

type LayoutType = { children: React.ReactElement };

const DashboardLayout = ({ children }: LayoutType) => {
	const [collapsed, setSidebarCollapsed] = useState(true);
	const [showSidebar, setShowSidebar] = useState(false);
	return (
		<div className="flex w-full min-h-screen">
			<div className={!collapsed ? 'w-1/5' : ''}>
				<Sidebar
					collapsed={collapsed}
					setCollapsed={setSidebarCollapsed}
					shown={showSidebar}
				/>
			</div>
			<div className={!collapsed ? 'w-4/5' : 'w-full md:px-16'}>
				<Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
				<main className="w-full">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
