'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const footerLinks = {
  explore: [
    { label: 'Discover Nepal', href: '#discover' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Culture & Heritage', href: '#culture' },
    { label: 'Plan Your Trip', href: '#plan-your-trip' },
  ],
  destinations: [
    { label: 'Kathmandu Valley', href: '#destinations' },
    { label: 'Pokhara', href: '#destinations' },
    { label: 'Everest Region', href: '#destinations' },
    { label: 'Annapurna', href: '#destinations' },
    { label: 'Chitwan National Park', href: '#destinations' },
    { label: 'Upper Mustang', href: '#destinations' },
    { label: 'Lumbini', href: '#destinations' },
  ],
  resources: [
    { label: 'Travel Guide', href: '#' },
    { label: 'Visa Information', href: '#' },
    { label: 'Permits & Fees', href: '#' },
    { label: 'Best Time to Visit', href: '#' },
    { label: 'Safety Guidelines', href: '#' },
    { label: 'Sustainable Tourism', href: '#' },
  ],
  connect: [
    { label: 'Contact Us', href: '#' },
    { label: 'Partnerships', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Careers', href: '#' },
  ],
};

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/visitnepal', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/visitnepal', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/visitnepal', icon: 'twitter' },
  { label: 'YouTube', href: 'https://youtube.com/visitnepal', icon: 'youtube' },
];

const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    facebook: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
    youtube: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 0-10A2 2 0 0 1 4 3a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44Z" />
        <path d="M10 8l6 4-6 4V8Z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-glacier-white pt-16 pb-8" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="white" size="lg" className="mb-4" />
            <p className="text-body-sm text-muted-light leading-relaxed max-w-xs">
              Discover the extraordinary landscapes, ancient cultures, and unforgettable journeys of Nepal.
            </p>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-caption text-golden-yellow mb-4">Explore</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted-light hover:text-glacier-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Destinations">
            <h3 className="text-caption text-golden-yellow mb-4">Destinations</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted-light hover:text-glacier-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Travel Resources">
            <h3 className="text-caption text-golden-yellow mb-4">Travel Resources</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted-light hover:text-glacier-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h3 className="text-caption text-golden-yellow mb-4">Connect</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted-light hover:text-glacier-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <div className="flex items-center gap-4" role="list" aria-label="Social media">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-light hover:text-golden-yellow transition-colors"
                      aria-label={social.label}
                    >
                      <SocialIcon name={social.icon} />
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted-light">
            © {new Date().getFullYear()} Visit Nepal. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-caption text-muted-light">
            <Link href="#privacy" className="hover:text-glacier-white transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-glacier-white transition-colors">Terms of Service</Link>
            <Link href="#cookies" className="hover:text-glacier-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}