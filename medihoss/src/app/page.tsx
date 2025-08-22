import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Welcome to Medihoss</h1>
      <p className="mb-6 text-center max-w-xl">
        Medihoss now supports secure media uploads using Cloudinary and Keyshade for secret management. You can upload images or videos and get a secure Cloudinary URL.
      </p>
      <Link href="/upload" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go to Upload Page
      </Link>
    </main>
  );
}