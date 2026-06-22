import { createFileRoute } from "@tanstack/react-router";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import {
  StickyNav, TrustBar, Features, Community, Shop, Onboarding,
  Global, HowItWorks, Testimonials, Footer,
} from "@/components/landing/sections";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ENTRENIQ",
  url: "https://entreniq.fit",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "7-day free trial, no credit card required",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1000",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ENTRENIQ — Your Intelligent Fitness Coach | AI Workouts, Coaching & Nutrition" },
      { name: "description", content: "ENTRENIQ is the all-in-one AI-powered fitness app. Personalized workouts, live coaching, barcode nutrition tracking, wearable sync, and a global fitness community. Start your free trial today." },
      { property: "og:title", content: "ENTRENIQ — Your Intelligent Fitness Coach" },
      { property: "og:description", content: "AI-powered workouts, real coaching, smart nutrition tracking. All in one app." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://entreniq.fit/" },
      { property: "og:image", content: "https://entreniq.fit/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ENTRENIQ — Your Intelligent Fitness Coach" },
      { name: "twitter:description", content: "AI-powered workouts, real coaching, smart nutrition tracking. All in one app." },
      { name: "twitter:image", content: "https://entreniq.fit/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://entreniq.fit/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(JSON_LD) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="font-sans antialiased text-white" style={{ backgroundColor: "#0F1209" }}>
      <StickyNav />

      <CinematicHero
        brandName="ENTRENIQ"
        tagline1="Train smarter,"
        tagline2="live stronger."
        cardHeading="Your intelligent fitness coach."
        cardDescription={
          <>
            <span className="text-white font-semibold">ENTRENIQ</span> pairs AI-powered workout and nutrition planning with real, verified coaches — personalized training, smart food tracking, and progress you can actually see.
          </>
        }
        metricValue={100000}
        metricLabel="Active Members"
        ctaHeading="Ready to transform?"
        ctaDescription="Join hundreds of thousands of users who train smarter with ENTRENIQ. Free to download. 7-day free trial. No credit card required."
      />

      <main id="download">
        <TrustBar />
        <Features />
        <Community />
        <Shop />
        <Onboarding />
        <Global />
        <HowItWorks />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
