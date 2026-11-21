'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-12 w-auto',
  xl: 'h-16 w-auto',
};

const variantMap = {
  default: '/logo.png',
  white: '/logo-white.png',
  dark: '/logo.png',
};

export default function Logo({ variant = 'default', size = 'md', className = '', onClick }: LogoProps) {
  const src = variantMap[variant];

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label="Visit Nepal - Home"
    >
      <Image
        src={src}
        alt="Visit Nepal"
        width={size === 'sm' ? 120 : size === 'md' ? 160 : size === 'lg' ? 200 : 280}
        height={size === 'sm' ? 40 : size === 'md' ? 50 : size === 'lg' ? 60 : 80}
        className={sizeClasses[size]}
        priority={size !== 'sm'}
        sizes="160px"
        quality={90}
      />
    </Link>
  );
}