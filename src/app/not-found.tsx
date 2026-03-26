import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-primary-400">404</h1>
      <p className="mt-4 text-lg text-surface-50">Page not found.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg border border-surface-300/50 px-5 py-2.5 text-sm text-white transition-colors hover:bg-surface-400/30"
      >
        Go home
      </Link>
    </div>
  );
}
