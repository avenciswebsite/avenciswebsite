import React from 'react';
import { FounderDayHero } from '../components/FounderDayHero';
import { Section1Hero } from '../components/Section1Hero';
import { Section2Problem } from '../components/Section2Problem';
import { Section3AvencisIdea } from '../components/Section3AvencisIdea';
import { Section12FounderDependency } from '../components/Section12FounderDependency';
import { Section13GrowthStages } from '../components/Section13GrowthStages';
import { Section18FinalCTA } from '../components/Section18FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="page-wrapper" id="home-page-root">
      {/* 1. Full-Bleed Immersive Founder's Day Split-Screen Experience */}
      <FounderDayHero />

      {/* 2. Section 1 — Core Positioning and Homepage Hero */}
      <Section1Hero />

      {/* 3. Section 2 — The Problem */}
      <Section2Problem />

      {/* 4. Section 3 — The Avencis Idea */}
      <Section3AvencisIdea />

      {/* 5. Section 12 — Founder Dependency (Teaser) */}
      <Section12FounderDependency isTeaser={true} />

      {/* 6. Section 13 — Business Growth Stages (Teaser) */}
      <Section13GrowthStages isTeaser={true} />

      {/* 7. Section 18 — Final CTA */}
      <Section18FinalCTA />
    </div>
  );
};
