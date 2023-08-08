'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
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
import { useRouter, useSearchParams } from 'next/navigation';

const validationSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email({
		message: 'Must be a valid email',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
type MessageType = { type: string; text: string; description?: string };
type LoginDTO = { email: string; password: string };

const SignIn = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setIsLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<MessageType | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	/* const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
		setIsLoading(true);
		const user: LoginDTO = {
			email: data.email,
			password: data.password,
		};
		axios
			.post('/api/auth/login', user)
			.then((response) => {
				console.log('Login Response', response);
				if (response.status == 200) {
					setMessage({ type: 'success', text: "You're logged successfully." });
					setTimeout(() => {
						setIsLoading(false);
						router.push('/dashboard');
					}, 500);
				}
			})
			.catch((error) => {
				console.log('Error', error);
				setIsLoading(false);
				setMessage({
					type: 'error',
					text: 'Email or password incorrect',
					description: error.message,
				});
			});
	}; */

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		try {
			setIsLoading(true);
			const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
			const res = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
				callbackUrl,
			});

			setIsLoading(false);

			// console.log('Login Response', res);
			if (!res?.error) {
				// router.push(callbackUrl);
				console.log('====================================');
				console.log(res);
				console.log('====================================');
			} else {
				setMessage({ type: 'error', text: 'Email or password incorrect' });
			}
		} catch (error: any) {
			setIsLoading(false);
			setMessage({ type: 'error', text: 'Email or password incorrect' });
		}
	};

	return (
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray">
				<span className="font-fira">Sign In</span>
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				<span className="font-poppins">
					log in to your account and enjoy our platform.
				</span>
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
							? router.push('/dashboard')
							: setMessage(null)
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
				</div>
				<Typography
					variant="small"
					color="gray"
					className="flex items-center justify-end font-normal"
				>
					<Link
						href="/auth/forgot-password"
						className="font-poppins italic transition-colors text-ds-primary hover:text-gray-700 text-right underline underline-offset-2"
					>
						Forgot password ?
					</Link>
				</Typography>
				<button
					disabled={loading ? true : false}
					type="submit"
					className="flex items-center justify-center w-full bg-ds-primary text-ds-secondary font-poppins py-3 rounded-xl disabled:cursor-progress disabled:text-ds-secondary disabled:bg-ds-primary hover:bg-ds-secondary hover:text-ds-primary mt-6 hover:font-bold"
				>
					{/* <Spinner className="h-5 w-5 mr-2 text-ds-secondary" /> */}
					{loading && <Spinner className="h-5 w-5 mr-2" color="green" />}
					Sign In
				</button>
				<Link href="/auth/sign-up">
					<Typography color="gray" className="mt-4 text-center font-normal">
						Don't have an account?{' '}
						<span className="font-medium text-blue-500 transition-colors hover:text-blue-700 underline underline-offset-2">
							Sign Up
						</span>
					</Typography>
				</Link>
			</form>
		</Card>
	);
};

export default SignIn;
