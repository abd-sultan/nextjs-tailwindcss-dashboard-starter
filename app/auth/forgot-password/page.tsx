'use client';

import React from 'react';
import AuthForm from '@/components/forms/AuthForm';
import AuthLayout from '../layout';

const ForgotPassword = () => {
	const handleSubmit = () => console.log('Form Submited');

	return <AuthForm type="forgot" onSubmit={handleSubmit} />;
};

export default ForgotPassword;
