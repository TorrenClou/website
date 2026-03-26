import type { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface PricingFeature {
  text: string;
}

export interface PricingCardData {
  badge: string;
  title: string;
  description: string;
  features: PricingFeature[];
  githubUrl: string;
}
