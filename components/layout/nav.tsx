import Link from 'next/link';

const links = [
  ['Dashboard', '/dashboard'],
  ['Lead Explorer', '/leads'],
  ['Saved Searches', '/saved-searches'],
  ['Alerts', '/alerts'],
  ['Settings', '/settings']
];

export function AppNav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-[95%] max-w-6xl items-center justify-between py-3">
        <Link href="/" className="text-lg font-bold text-brand">WealthSignal</Link>
        <nav className="flex gap-4 text-sm text-slate-700">
          {links.map(([name, href]) => (
            <Link className="hover:text-brand" key={href} href={href}>
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
