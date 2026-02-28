export default function ResetPasswordPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <p className="mt-2 text-sm text-slate-600">Enter your email to receive reset instructions.</p>
      <form className="mt-4 space-y-3">
        <input className="w-full rounded border p-2" placeholder="Work email" type="email" />
        <button className="w-full rounded bg-brand py-2 text-white">Send reset link</button>
      </form>
    </main>
  );
}
