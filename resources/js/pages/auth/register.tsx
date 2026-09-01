import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterForm extends Record<string, string | boolean> {
    name: string;
    student_id: string;
    email: string;
    phone: string;
    department_id: string;
    password: string;
    password_confirmation: string;
}

export default function Register({ departments }: { departments: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        student_id: '',
        email: '',
        phone: '',
        department_id: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Create account" />
            <div className="flex min-h-screen items-center justify-center bg-[#eef3f8] p-4">
                <div className="w-full max-w-4xl rounded-[26px] border border-slate-300 bg-[#edf5fb] p-8 shadow-sm md:p-10">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0e4fc7] text-white shadow-sm">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <div>
                            <h2 className="text-[2rem] leading-none font-bold tracking-tight text-slate-800">CampusConnect</h2>
                            <p className="mt-1 text-sm text-slate-600">Connect. Participate. Achieve.</p>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-800">Create your account</h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-600">
                        Students register here. Coordinator and faculty accounts are created by the administration.
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-medium text-slate-700">Full name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="student_id" className="text-base font-medium text-slate-700">Student ID</Label>
                                <Input
                                    id="student_id"
                                    type="text"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.student_id} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-medium text-slate-700">University email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-base font-medium text-slate-700">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department_id" className="text-base font-medium text-slate-700">Department</Label>
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    disabled={processing}
                                    className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">Select department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.department_id} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base font-medium text-slate-700">Password</Label>
                                <PasswordInput
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-base font-medium text-slate-700">Confirm password</Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    className="h-14 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-800 shadow-sm"
                                />
                                <InputError message={errors.password_confirmation ?? errors.password} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d4bd7] px-4 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-[#0b3db1] disabled:opacity-70"
                        >
                            {processing && <LoaderCircle className="h-5 w-5 animate-spin" />}
                            Create account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-base text-slate-700">
                        Already registered?{' '}
                        <Link href={route('login')} className="font-semibold text-[#0d4bd7] hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
