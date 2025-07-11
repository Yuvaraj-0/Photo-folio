import Navbar from '../components/Navbar';
export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 w-full max-w-4xl mx-auto">{children}</main>
    </>
  );
}
