export default function SignupPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form className="mt-4 space-y-3">
        <input className="w-full rounded border p-2" placeholder="Full name" />
        <input className="w-full rounded border p-2" placeholder="Work email" type="email" />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" />
        <textarea className="w-full rounded border p-2" placeholder="Consent notes (required for compliance)" rows={3} />
        <button className="w-full rounded bg-brand py-2 text-white">Sign up</button>
      </form>
    </main>
  );
}
