'use client';

import React, { FormEventHandler } from 'react';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type AuthFormTypes = {
	type: string;
	onSubmit: FormEventHandler<HTMLFormElement> | any;
};

const validationSchema = z
	.object({
		name: z.string().min(1, { message: 'Firstname is required' }),
		email: z.string().min(1, { message: 'Email is required' }).email({
			message: 'Must be a valid email',
		}),
		password: z
			.string()
			.min(6, { message: 'Password must be atleast 6 characters' }),
		confirmPassword: z
			.string()
			.min(1, { message: 'Confirm Password is required' }),
		/* terms: z.literal(true, {
			errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
		}), */
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Password don't match",
	});

type ValidationSchema = z.infer<typeof validationSchema>;

const AuthForm = ({ type, onSubmit }: AuthFormTypes) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmitForm: SubmitHandler<ValidationSchema> = (data) => {
		console.log(data);
		onSubmit(data);
	};

	return (
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray">
				<span className="font-fira">
					{type == 'login' && 'Sign In'}
					{type == 'register' && 'Sign Up'}
					{type == 'forgot' && 'Forgot Password'}
					{type == 'reset' && 'Reset Password'}
				</span>
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				{type == 'login' && (
					<span className="font-poppins">
						log in to your account and enjoy our platform.
					</span>
				)}
				{type == 'register' && (
					<span className="font-poppins">Enter your details to register.</span>
				)}
				{type == 'forgot' && (
					<span className="font-poppins">
						Enter your email to recover your password.
					</span>
				)}
				{type == 'reset' && (
					<span className="font-poppins">
						Enter your new password and log in.
					</span>
				)}
			</Typography>
			<form
				className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				onSubmit={handleSubmit(onSubmitForm)}
			>
				<div className="mb-4 flex flex-col gap-6">
					{type == 'register' && (
						<>
							<Input size="lg" label="Name" {...register('name')} />
							{errors.name && (
								<p className="text-xs italic text-red-500 mt-2">
									{errors.name?.message}
								</p>
							)}
						</>
					)}
					{type != 'reset' && <Input size="lg" label="Email" />}
					{(type == 'login' || type == 'register') && (
						<>
							<Input
								type="password"
								size="lg"
								label="Password"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-xs italic text-red-500 mt-2">
									{errors.password?.message}
								</p>
							)}
						</>
					)}
					{type == 'reset' && (
						<>
							<Input
								type="password"
								size="lg"
								label="New Password"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-xs italic text-red-500 mt-2">
									{errors.password?.message}
								</p>
							)}
							<Input
								type="password"
								size="lg"
								label="Confirm Password"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<p className="text-xs italic text-red-500 mt-2">
									{errors.confirmPassword?.message}
								</p>
							)}
						</>
					)}
				</div>
				{type == 'register' && (
					<Checkbox
						label={
							<Typography
								variant="small"
								color="gray"
								className="flex items-center font-normal"
							>
								I agree the
								<span className="font-medium transition-colors hover:text-blue-500">
									&nbsp;Terms and Conditions
								</span>
							</Typography>
						}
						containerProps={{ className: '-ml-2.5' }}
					/>
				)}
				{type == 'login' && (
					<Typography
						variant="small"
						color="gray"
						className="flex items-center justify-end font-normal"
					>
						<Link
							href="/auth/forgot-password"
							className="font-medium transition-colors text-blue-500 hover:text-blue-700 text-right underline underline-offset-2"
						>
							Forgot password ?
						</Link>
					</Typography>
				)}
				<button
					type="submit"
					className="flex items-center justify-center w-full bg-ds-primary text-ds-secondary font-poppins py-3 rounded-xl hover:bg-ds-secondary hover:text-ds-primary mt-6"
				>
					{type == 'login' && 'Sign In'}
					{type == 'register' && 'Register'}
					{type == 'forgot' && 'Send'}
					{type == 'reset' && 'Reset password'}
				</button>
				{type == 'register' && (
					<Link href="/auth/sign-in">
						<Typography color="gray" className="mt-4 text-center font-normal">
							Already have an account?{' '}
							<span className="font-medium text-blue-500 transition-colors hover:text-blue-700 underline underline-offset-2">
								Sign In
							</span>
						</Typography>
					</Link>
				)}
				{type == 'login' && (
					<Link href="/auth/sign-up">
						<Typography color="gray" className="mt-4 text-center font-normal">
							Don't have an account?{' '}
							<span className="font-medium text-blue-500 transition-colors hover:text-blue-700 underline underline-offset-2">
								Sign Up
							</span>
						</Typography>
					</Link>
				)}
			</form>
		</Card>
	);
};

export default AuthForm;
