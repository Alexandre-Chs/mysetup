export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg mt-2">Oops! We checked everywhere...</p>
      <p className="text-lg">But this user doesn&apos;t seem to exist.</p>
      <a className="p-2 px-4 bg-red-500 rounded-md mt-4 text-white hover:bg-red-600 transition" href="/">
        Take me home
      </a>
    </div>
  );
}
