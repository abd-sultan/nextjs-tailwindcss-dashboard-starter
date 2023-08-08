import React from 'react';

type LayoutType = { children: React.ReactElement };

const AuthLayout = ({ children }: LayoutType) => {
	return (
		<div className="flex w-full h-screen">
			<div className="flex flex-col items-center justify-center w-2/3 h-screen bg-gradient-to-r from-blue-gray-600 to-blue-gray-100">
				<h1 className="text-3xl text-light-blue-900 font-bold font-poppins">
					Welcome
				</h1>
			</div>
			<div className="w-1/3 h-screen flex items-center justify-center z-50 bg-blue-gray-50">
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
