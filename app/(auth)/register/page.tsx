'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import useAuthStore from '@/store/auth/index';
import Logo from '@/components/logo';

const EmailSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const VerificationSchema = Yup.object().shape({
  otp: Yup.string().required('Verification otp is required'),
});

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

interface FormValues {
  email: string;
  otp: string;
  name: string;
  password: string;
}

const SignupForm=()=> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const { signup, verify, setPassword, isLoading, isSuccess }: any = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [userMail, setUserMail] = useState('');

  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      setUserMail(userParam);
    }
  }, [searchParams]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const stepParam = query.get('step');
      if (stepParam) {
        setStep(Number(stepParam));
      }
    }
  }, []);

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === 1) {
      const success = await signup(values.name, values.email);
      if (success) {
        setStep(2);
        router.push(`${pathname}?step=2&user=${values.email}`);
        actions.setSubmitting(false);
      }
    } else if (step === 2) {
      const success = await verify(userMail, values.otp);
      if (success) {
        setStep(3);
        router.push(`${pathname}?step=3&user=${values.email || userMail}`);
        actions.setSubmitting(false);
      }
    } else if (step === 3) {
      const success = await setPassword(userMail, values.password);
      if (success) {
        actions.setSubmitting(false);
        window.location.href = '/auth/login';
      }
    }
  };

  const startGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="h-screen w-screen flex items-center">

        <Card className="max-w-sm border-none shadow-lg">
          <CardHeader>
            <Link href="/">
              <Logo />
            </Link>
            <CardTitle className="text-2xl mb-2">
              {step === 2 && (
                <div className="bg-gray-100 dark:bg-gray-600 h-10 w-10 flex items-center justify-center rounded-full">
                  <ShieldCheck className="rotate-[-30deg]" />
                </div>
              )}
              {step === 3 && (
                <div className="bg-gray-100 dark:bg-gray-600 h-10 w-10 flex items-center justify-center rounded-full">
                  <LockKeyhole className="rotate-[-30deg]" />
                </div>
              )}
            </CardTitle>
            <span className="text-16 font-semibold">
              {step === 1 && 'Get started for free'}
              {step === 2 && 'Enter the verification otp sent to your email'}
              {step === 3 && 'Create a secure password'}
            </span>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: userMail,
                otp: '',
                name: '',
                password: '',
              }}
              validationSchema={
                step === 1 ? EmailSchema : step === 2 ? VerificationSchema : SignupSchema
              }
              onSubmit={handleSubmit}>
              {({ isSubmitting, values }) => (
                <Form className="grid gap-4">
                  {step === 1 && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="youremail@example.com"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Continue'}
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Field
                          as={Input}
                          id="otp"
                          name="otp"
                          type="text"
                          placeholder="Enter verification otp"
                          className="border border-[#555] "
                          maxLength={6}
                        />
                        <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
                        <CardDescription className="text-xs flex items-center justify-start gap-2">
                          <p>Check your email for the verification otp.</p>{' '}
                          <Button variant={'link'} className="m-0 p-0">
                            Resend
                          </Button>
                        </CardDescription>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || values.otp.length != 6}>
                        {isLoading ? 'Submitting...' : 'Continue'}
                      </Button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid gap-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="border border-[#555]"
                        />

                        <div
                          className="absolute right-2 top-8 cursor-pointer"
                          onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className=" flex flex-col gap-2">
                        {values.password && (
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold">Password strength:</p>
                            <div className="flex-1 bg-gray-200 rounded-full h-1 mr-2">
                              <div
                                className={`h-1 rounded-full ${values.password.length >= 8 &&
                                    /[a-z]/.test(values.password) &&
                                    /[A-Z]/.test(values.password) &&
                                    /[0-9]/.test(values.password) &&
                                    /[!@#$%^&*]/.test(values.password)
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                  }`}
                                style={{
                                  width: `${Math.min(100, values.password.length * 12.5)}%`,
                                }}></div>
                            </div>
                            <span
                              className={`text-xs ${values.password.length >= 8 &&
                                  /[a-z]/.test(values.password) &&
                                  /[A-Z]/.test(values.password) &&
                                  /[0-9]/.test(values.password) &&
                                  /[!@#$%^&*]/.test(values.password)
                                  ? 'text-green-500'
                                  : 'text-red-500'
                                }`}>
                              {values.password.length >= 8 &&
                                /[a-z]/.test(values.password) &&
                                /[A-Z]/.test(values.password) &&
                                /[0-9]/.test(values.password) &&
                                /[!@#$%^&*]/.test(values.password)
                                ? 'Strong'
                                : 'Weak'}
                            </span>
                          </div>
                        )}
                        <p className="text-xs font-semibold ">Must contain at least</p>
                        <CardDescription className="text-xs flex flex-col gap-1  list-disc">
                          <li>8 characters</li>
                          <li>1 lower case character</li>
                          <li>1 upper case character</li>
                          <li>1 number</li>
                          <li>1 special character</li>
                        </CardDescription>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing up' : 'Sign up'}
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <CardDescription className="text-xs">
              {'By clicking "Continue with Google/Email" you agree to our User'}{' '}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href={'#'} className="underline">
                Privacy Policy
              </Link>
            </CardDescription>
            <div className="mt-4 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline font-semibold">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
    </div>
  );
}


export default SignupForm;