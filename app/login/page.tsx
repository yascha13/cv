import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Demo auth is enabled for MVP. Use any email + 6+ char password.</p>
      <form className="mt-4 space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" type="email" />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" />
        <button className="w-full rounded bg-brand py-2 text-white">Login</button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/reset-password">Forgot password?</Link>
        <Link href="/signup">Create account</Link>
      </div>
    </main>
  );
}
