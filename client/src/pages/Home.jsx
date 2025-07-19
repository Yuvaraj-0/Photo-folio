import HeroSection from '../components/HeroSection';
import Uniq from '../components/Uniq';
import ContactPg from './Inquiry.jsx'
export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Other sections like About, Gallery, etc. */}
      <Uniq />
      <ContactPg />
    </main>
  );
}
