'use client';

import React from 'react';
import AuthForm from '@/components/forms/AuthForm';
import AuthLayout from '../layout';

const ResetPassword = () => {
	const handleSubmit = () => console.log('Form Submited');

	return <AuthForm type="reset" onSubmit={handleSubmit} />;
};

export default ResetPassword;
