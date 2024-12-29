import Faqs from '@/components/LandingPage/Faqs';
import GetStarted from '@/components/LandingPage/get-started-section';
import { Hero } from '@/components/LandingPage/hero-section';
import { ReviewMarquee } from '@/components/LandingPage/reviews-section';
import Features from '@/components/LandingPage/feature-section';
import Navbar from '@/components/LandingPage/nav-bar';
import Footer from '@/components/LandingPage/footer';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'DataXpert - Predictive Analytics Made Easy',
  description:
    'DataXpert is a predictive analytics platform that makes it easy to explore data, build models, and make predictions.',
});

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      {/* <Features />
      <ReviewMarquee />
      <GetStarted /> */}
      {/* <Faqs /> */}
      <Footer />
    </div>
  );
}
