'use client';

import React from 'react';
import axios from 'axios';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
	Alert,
	Spinner,
} from '@material-tailwind/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/lib/models/user';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
		terms: z.literal(true, {
			errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Password don't match",
	});

type ValidationSchema = z.infer<typeof validationSchema>;
type MessageType = { type: string; text: string; description?: string };

const SignUp = () => {
	const router = useRouter();
	const [loading, setIsLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<MessageType | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
		setIsLoading(true);
		const user: User = {
			name: data.name,
			email: data.email,
			password: data.password,
		};
		axios
			.post('/api/auth/register', user)
			.then((response) => {
				console.log('Response', response);
				if (response.status == 201) {
					setMessage({ type: 'success', text: 'User registred successfully.' });
					setTimeout(() => {
						setIsLoading(false);
						router.push('/auth/sign-in');
					}, 2500);
				}
			})
			.catch((error) => {
				console.log('Error', error);
				setMessage({
					type: 'error',
					text: 'Error while registred user. Please try again!',
					description: error.message,
				});
			});
	};

	return (
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray">
				<span className="font-fira">Sign Up</span>
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				<span className="font-poppins">Enter your details to register.</span>
			</Typography>
			{message && (
				<Alert
					open={true}
					color={message?.type == 'success' ? 'green' : 'red'}
					className="rounded-none border-l-4 font-medium"
					icon={
						message?.type == 'success' ? <FaCheckCircle /> : <FaTimesCircle />
					}
					onClose={() =>
						message?.type == 'success'
							? router.push('/auth/sign-in')
							: router.refresh()
					}
				>
					<Typography variant="h5" color="white font-poppins">
						{message?.type}
					</Typography>
					<Typography color="white" className="mt-2 font-poppins">
						{message?.text}
					</Typography>
					<Typography color="white" className="mt-2 text-xs font-poppins">
						{message?.description}
					</Typography>
				</Alert>
			)}
			<form
				className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-4 flex flex-col gap-6">
					<Input size="lg" label="Name" {...register('name')} />
					{errors.name && (
						<p className="text-xs italic text-red-500">
							{errors.name?.message}
						</p>
					)}
					<Input size="lg" label="Email" {...register('email')} />
					{errors.email && (
						<p className="text-xs italic text-red-500">
							{errors.email?.message}
						</p>
					)}
					<Input
						type="password"
						size="lg"
						label="Password"
						{...register('password')}
					/>
					{errors.password && (
						<p className="text-xs italic text-red-500">
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
						<p className="text-xs italic text-red-500">
							{errors.confirmPassword?.message}
						</p>
					)}
				</div>
				<Checkbox
					{...register('terms')}
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
				{errors.terms && (
					<p className="text-xs italic text-red-500 mt-2">
						{errors.terms?.message}
					</p>
				)}
				<button
					disabled={loading ? true : false}
					type="submit"
					className="flex items-center justify-center w-full bg-ds-primary text-ds-secondary font-poppins py-3 rounded-xl disabled:cursor-progress disabled:text-ds-secondary disabled:bg-ds-primary hover:bg-ds-secondary hover:text-ds-primary mt-6"
				>
					{/* <Spinner className="h-5 w-5 mr-2 text-ds-secondary" /> */}
					{loading && <Spinner className="h-5 w-5 mr-2" color="green" />}
					Register
				</button>
				<Link href="/auth/sign-in">
					<Typography color="gray" className="mt-4 text-center font-normal">
						Already have an account?{' '}
						<span className="font-medium text-blue-500 transition-colors hover:text-blue-700 underline underline-offset-2">
							Sign In
						</span>
					</Typography>
				</Link>
			</form>
		</Card>
	);
};

export default SignUp;
