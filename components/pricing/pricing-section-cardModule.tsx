"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-cardModule.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;
  description: string;
  description2: string;
  monthlyAmount?: number;
  yearlyAmount?: number;
  priceSuffix?: string;
  priceText?: string;
  priceHref?: string;
  billingLabelYearly: string;
  features: Array<string | { text: string; tooltip: string }>;
  highlighted?: boolean;
  cta: { label: string; href: string };
  showAltSalesLink?: boolean;
  showBillingToggle?: boolean;
};

const plans: Plan[] = [
  {
    key: "hobby",
    name: "Hobby",
    priceText: "$0",
    description: "",
    description2: "",
    billingLabelYearly: "No maintenance price",
    features: [
      "Next.js + Vercel deployment",
      { text: "Web Application Firewall", tooltip: "Security layer that protects your website from common web attacks and threats" },
      { text: "DDoS Mitigation", tooltip: "Protection against Distributed Denial of Service attacks that could overwhelm your site" },
      "Basic SEO",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "plus",
    name: "Plus",
    monthlyAmount: 34,
    yearlyAmount: 28,
    priceSuffix: "/mo",
    description: "Starting at ",
    description2: " + additional features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      { text: "Cold start prevention", tooltip: "Keeps your site running fast by avoiding delays when a function hasn't been used recently" },
      "Traffic & performance insights",
      "Content structure + conversion guidance",
      { text: "Enhanced SEO + analytics", tooltip: "Advanced tools to track rankings, optimize for search engines, and understand visitor behavior" },
      "Priority support",
      "Custom components + sections",
    ],
    highlighted: true,
    cta: { label: "Get Started", href: "/get-started" },
    showAltSalesLink: true,
  },
  {
    key: "business",
    name: "Business",
    monthlyAmount: 65,
    yearlyAmount: 55,
    priceSuffix: "/mo",
    description: "Starting at ",
    description2: " + advanced features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      { text: "Faster builds with prioritized CI", tooltip: "Your code deploys faster by getting priority in the build queue" },
      { text: "Advanced caching & ISR configuration", tooltip: "Incremental Static Regeneration allows pages to update without rebuilding your entire site" },
      "Technical SEO improvements",
      { text: "Performance budgets (Core Web Vitals)", tooltip: "Set limits on page performance metrics to ensure users have a fast experience" },
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceText: "Contact us",
    priceHref: "/contact",
    description: "",
    description2: "",
    billingLabelYearly: "Annual billing only",
    features: [
      "Unlimited pages & components",
      { text: "Advanced security (SSO, RBAC)", tooltip: "Single Sign-On for easy user management + Role-Based Access Control for fine-grained permissions" },
      { text: "Compliance support (SOC 2, GDPR)", tooltip: "Help meeting security standards (SOC 2) and data privacy regulations (GDPR)" },
      { text: "Custom SLAs & uptime guarantees", tooltip: "Service Level Agreements - guaranteed minimum uptime and performance commitments" },
      "Dedicated support & onboarding",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const makeProps = (props: IconProps) => {
  const { size = 16, ...rest } = props;
  return { size, rest };
};

const FeatureIcons: Array<(props: IconProps) => JSX.Element> = [
  // 1
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 2H9V0.75V0H10.5V0.75V2H13C13.5523 2 14 2.44772 14 3V5.5H15.25H16V7H15.25H14V9H15.25H16V10.5H15.25H14V13C14 13.5523 13.5523 14 13 14H10.5V15.25V16H9V15.25V14H7V15.25V16H5.5V15.25V14H3C2.44772 14 2 13.5523 2 13V10.5H0.75H0V9H0.75H2V7H0.75H0V5.5H0.75H2V3C2 2.44772 2.44772 2 3 2H5.5V0.75V0H7V0.75V2ZM3.5 8.98228V3.5H12.5V9H10C9.56114 9 9.29513 8.85208 9.13685 8.68588C8.96919 8.50984 8.875 8.26309 8.875 8C8.875 7.73691 8.96919 7.49016 9.13685 7.31412C9.29513 7.14792 9.56114 7 10 7V5.5C8.82792 5.5 7.9118 5.74294 7.16034 6.13019C6.41599 6.51379 5.87229 7.01955 5.42887 7.4794C5.29221 7.62111 5.17056 7.75171 5.05789 7.87267L5.05789 7.87267C4.78031 8.17066 4.55724 8.41014 4.2986 8.6132C4.04734 8.81045 3.80061 8.93775 3.5 8.98228ZM3.5 10.4907V12.5H12.5V10.5H10C9.18886 10.5 8.51737 10.2104 8.05065 9.72037C7.59331 9.24016 7.375 8.61191 7.375 8C7.375 7.91436 7.37928 7.8284 7.38788 7.74258C7.06615 7.96886 6.78522 8.23377 6.50863 8.5206C6.41912 8.61343 6.32548 8.71405 6.22828 8.8185L6.22819 8.8186C5.92315 9.14637 5.58298 9.5119 5.22484 9.79305C4.75982 10.1581 4.20727 10.437 3.5 10.4907Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 3
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <g clipPath="url(#clip0_4628_1900)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.25 0C0.559644 0 0 0.559645 0 1.25V12.25C0 12.9404 0.559644 13.5 1.25 13.5H4.5V12H1.5V9.5H5.25H6V8.75V5.5H15.25H16V4.75V1.25C16 0.559644 15.4404 0 14.75 0H1.25ZM4.5 8H1.5V5.5H4.5V8ZM1.5 4H4.5V1.5H1.5V4ZM6 4V1.5H10V4H6ZM11.5 4H14.5V1.5H11.5V4ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z"
            fill="currentColor"
            style={{
              fill: "currentColor",
              fillOpacity: 1,
            }}
            mask="url(#path-1-inside-1_4628_1900)"
          />
        </g>
        <defs>
          <clipPath id="clip0_4628_1900">
            <rect width="16" height="16" fill="white" style={{ fillOpacity: 1 }} />
          </clipPath>
          <mask id="path-1-inside-1_4628_1900" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.25 0C0.559644 0 0 0.559645 0 1.25V12.25C0 12.9404 0.559644 13.5 1.25 13.5H4.5V12H1.5V9.5H5.25H6V8.75V5.5H15.25H16V4.75V1.25C16 0.559644 15.4404 0 14.75 0H1.25ZM4.5 8H1.5V5.5H4.5V8ZM1.5 4H4.5V1.5H1.5V4ZM6 4V1.5H10V4H6ZM11.5 4H14.5V1.5H11.5V4ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z"
            />
          </mask>
        </defs>
      </svg>
    );
  },

  // 4
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 9.52717V4.057C3.69054 4.00405 3.8926 3.95131 4.10681 3.8954L4.10684 3.89539C4.25396 3.85699 4.40682 3.81709 4.5656 3.7746C5.15243 3.61758 5.79596 3.43066 6.38899 3.17017C6.97334 2.91351 7.55664 2.56529 8 2.05704C8.44336 2.56529 9.02666 2.91351 9.61101 3.17017C10.204 3.43066 10.8476 3.61758 11.4344 3.7746C11.5932 3.81709 11.746 3.85699 11.8932 3.89539C12.1074 3.9513 12.3094 4.00405 12.5 4.057V9.52717C12.5 10.9221 11.7257 12.2018 10.49 12.849L8 14.1533L5.50997 12.849C4.27429 12.2018 3.5 10.9221 3.5 9.52717ZM6.87802 1.06132C7.10537 0.796772 7.25 0.467199 7.25 0H8.75C8.75 0.467199 8.89463 0.796772 9.12198 1.06132C9.3643 1.34329 9.73045 1.58432 10.2142 1.79681C10.6962 2.00853 11.2465 2.17155 11.8221 2.32558C11.9557 2.36133 12.0926 2.39704 12.2305 2.43301L12.2307 2.43305C12.6631 2.54586 13.1054 2.66124 13.4872 2.78849L14 2.95943V3.5V9.52717C14 11.4801 12.916 13.2716 11.186 14.1778L8.34801 15.6644L8 15.8467L7.65199 15.6644L4.81396 14.1778C3.084 13.2716 2 11.4801 2 9.52717V3.5V2.95943L2.51283 2.78849C2.89458 2.66124 3.33687 2.54586 3.76932 2.43305L3.7694 2.43303C3.90732 2.39706 4.04424 2.36134 4.17787 2.32558C4.75351 2.17155 5.30375 2.00853 5.78576 1.79681C6.26955 1.58432 6.6357 1.34329 6.87802 1.06132ZM10.5303 7.53033L11.0607 7L10 5.93934L9.46967 6.46967L7 8.93934L6.53033 8.46967L6 7.93934L4.93934 9L5.46967 9.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303L10.5303 7.53033Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 5
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 1V12.75C1 13.9926 2.00736 15 3.25 15H15V13.5H3.25C2.83579 13.5 2.5 13.1642 2.5 12.75V1H1ZM14.2971 6.01303L14.8101 5.46596L13.716 4.43989L13.2029 4.98697L9.98259 8.42099L7.707 6.14629C7.31646 5.75589 6.6834 5.75595 6.29293 6.14642L4.21967 8.21967L3.68934 8.75L4.75 9.81066L5.28033 9.28033L7.0001 7.56057L9.28723 9.84681C9.68667 10.2461 10.3373 10.2356 10.7236 9.82361L14.2971 6.01303Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 6
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2642 3.5H2.73578L8 8.01219L13.2642 3.5ZM1.5 4.41638V11.5C1.5 12.0523 1.94772 12.5 2.5 12.5H13.5C14.0523 12.5 14.5 12.0523 14.5 11.5V4.41638L8.48809 9.56944L8 9.98781L7.51191 9.56944L1.5 4.41638ZM0 2H1.5H14.5H16V3.5V11.5C16 12.8807 14.8807 14 13.5 14H2.5C1.11929 14 0 12.8807 0 11.5V3.5V2Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 7
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.30761 1.5L1.5 5.30761L1.5 10.6924L5.30761 14.5H10.6924L14.5 10.6924V5.30761L10.6924 1.5H5.30761ZM5.10051 0C4.83529 0 4.58094 0.105357 4.3934 0.292893L0.292893 4.3934C0.105357 4.58094 0 4.83529 0 5.10051V10.8995C0 11.1647 0.105357 11.4191 0.292894 11.6066L4.3934 15.7071C4.58094 15.8946 4.83529 16 5.10051 16H10.8995C11.1647 16 11.4191 15.8946 11.6066 15.7071L15.7071 11.6066C15.8946 11.4191 16 11.1647 16 10.8995V5.10051C16 4.83529 15.8946 4.58093 15.7071 4.3934L11.6066 0.292893C11.4191 0.105357 11.1647 0 10.8995 0H5.10051ZM8.75 3.75V4.5V8L8.75 8.75H7.25V8V4.5V3.75H8.75ZM8 12C8.55229 12 9 11.5523 9 11C9 10.4477 8.55229 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 8
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.51324 3.62367L3.76375 8.34731C3.61845 8.7396 3.24433 8.99999 2.826 8.99999H0.75H0V7.49999H0.75H2.47799L4.56666 1.86057C4.88684 0.996097 6.10683 0.988493 6.43776 1.84891L10.5137 12.4463L12.2408 8.1286C12.3926 7.74894 12.7604 7.49999 13.1693 7.49999H15.25H16V8.99999H15.25H13.5078L11.433 14.1868C11.0954 15.031 9.8976 15.023 9.57122 14.1744L5.51324 3.62367Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 9
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 2.75C3.5 2.05964 4.05964 1.5 4.75 1.5C5.44036 1.5 6 2.05964 6 2.75C6 3.44036 5.44036 4 4.75 4C4.05964 4 3.5 3.44036 3.5 2.75ZM4.75 0C3.23122 0 2 1.23122 2 2.75C2 4.00878 2.84575 5.07002 4 5.39648V11.25C4 13.8734 6.12665 16 8.75 16H9.25C11.8734 16 14 13.8734 14 11.25V4.25V2.43934L12.7197 3.71967L10.4697 5.96967L9.93934 6.5L11 7.56066L11.5303 7.03033L12.5 6.06066V11.25C12.5 13.0449 11.0449 14.5 9.25 14.5H8.75C6.95507 14.5 5.5 13.0449 5.5 11.25V5.39648C6.65425 5.07002 7.5 4.00878 7.5 2.75C7.5 1.23122 6.26878 0 4.75 0Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 10 (multicolor spark/triangle)
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          d="M9 7L12.5 2.5"
          stroke="#E5484D"
          style={{
            stroke: "#E5484D",
            strokeOpacity: 1,
          }}
          strokeWidth="1.5"
        />
        <path
          d="M10.5 9.5L15.75 10.5"
          stroke="#52AEFF"
          style={{
            stroke: "#52AEFF",
            strokeOpacity: 1,
          }}
          strokeWidth="1.5"
        />
        <path
          d="M10 8L15.75 6"
          stroke="#45DEC4"
          style={{
            stroke: "#45DEC4",
            strokeOpacity: 1,
          }}
          strokeWidth="1.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.14568 3.56625L7 2L7.85432 3.56625L12.1818 11.5L13 13H11.2914H2.70863H1L1.81818 11.5L3.31818 8.75H0V7.25H4.13636L6.14568 3.56625ZM3.52681 11.5L7 5.13249L10.4732 11.5H3.52681Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 11
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.75 0C3.95507 0 2.5 1.45507 2.5 3.25V3.75C2.5 5.54493 3.95507 7 5.75 7H6.25C8.04493 7 9.5 5.54493 9.5 3.75V3.25C9.5 1.45507 8.04493 0 6.25 0H5.75ZM4 3.25C4 2.2835 4.7835 1.5 5.75 1.5H6.25C7.2165 1.5 8 2.2835 8 3.25V3.75C8 4.7165 7.2165 5.5 6.25 5.5H5.75C4.7835 5.5 4 4.7165 4 3.75V3.25ZM15.8107 5.75L15.2803 6.28033L12.5303 9.03033C12.2374 9.32322 11.7626 9.32322 11.4697 9.03033L10.4697 8.03033L9.93934 7.5L11 6.43934L11.5303 6.96967L12 7.43934L14.2197 5.21967L14.75 4.68934L15.8107 5.75ZM1.5 13.1709V14.5H10.5V13.1709C9.68042 11.5377 8.00692 10.5 6.17055 10.5H5.82945C3.99308 10.5 2.31958 11.5377 1.5 13.1709ZM0.0690305 12.6857C1.10604 10.4388 3.35483 9 5.82945 9H6.17055C8.64517 9 10.894 10.4388 11.931 12.6857L12 12.8353V13V15.25V16H11.25H0.75H0V15.25V13V12.8353L0.0690305 12.6857Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 12
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.80808 4.44191L2.25003 4.88386L3.13391 3.99997L2.69196 3.55803L1.63391 2.49997L2.69197 1.44191L3.13391 0.999972L2.25003 0.116089L1.80808 0.558031L0.484858 1.88126C0.143149 2.22296 0.143149 2.77698 0.484859 3.11869L1.80808 4.44191ZM12 0.999972H11.25V2.49997H12H13.5V11.75C13.5 12.7165 12.7165 13.5 11.75 13.5H4.25002C3.28353 13.5 2.50003 12.7165 2.50003 11.75V6.99997V6.24997H1.00003V6.99997V11.75C1.00003 13.5449 2.4551 15 4.25002 15H11.75C13.545 15 15 13.5449 15 11.75V1.74997V0.999972H14.25H12ZM7.75003 4.88386L8.19197 4.44191L9.51519 3.11869C9.8569 2.77698 9.8569 2.22296 9.51519 1.88126L8.19196 0.55803L7.75002 0.116089L6.86614 0.999973L7.30808 1.44191L8.36614 2.49997L7.30809 3.55803L6.86615 3.99997L7.75003 4.88386ZM4.13155 3.89688L4.02847 4.51535L5.26541 4.7215L5.36848 4.10303L5.86848 1.10303L5.97156 0.484566L4.73462 0.278409L4.63155 0.896878L4.13155 3.89688Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 13
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15714 0L2.33264 9.40776L1.77252 10.5H3.00001H7.00001C7.13808 10.5 7.25001 10.6119 7.25001 10.75V16H8.84288L13.6674 6.59224L14.2275 5.5H13H9.00001C8.86194 5.5 8.75001 5.38807 8.75001 5.25V0H7.15714ZM7.00001 9H4.22749L7.25001 3.1061V5.25C7.25001 6.2165 8.03351 7 9.00001 7H11.7725L8.75001 12.8939V10.75C8.75001 9.7835 7.96651 9 7.00001 9Z"
          fill="currentColor"
        />
      </svg>
    );
  },

   (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 1.5L2.5 1.5L2.5 4.5C2.5 5.05228 2.94772 5.5 3.5 5.5L12.5 5.5C13.0523 5.5 13.5 5.05228 13.5 4.5V1.5ZM15 0H13.5H2.5H1V1.5V4.5C1 5.88071 2.11929 7 3.5 7L12.5 7C13.8807 7 15 5.88071 15 4.5V1.5V0ZM2.5 13.5V10.5H13.5V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5ZM1 9H2.5H13.5H15V10.5V13.5C15 14.8807 13.8807 16 12.5 16H3.5C2.11929 16 1 14.8807 1 13.5V10.5V9ZM4.75 13.25C5.16421 13.25 5.5 12.9142 5.5 12.5C5.5 12.0858 5.16421 11.75 4.75 11.75C4.33579 11.75 4 12.0858 4 12.5C4 12.9142 4.33579 13.25 4.75 13.25ZM8 12.5C8 12.9142 7.66421 13.25 7.25 13.25C6.83579 13.25 6.5 12.9142 6.5 12.5C6.5 12.0858 6.83579 11.75 7.25 11.75C7.66421 11.75 8 12.0858 8 12.5ZM10.5 3.5C10.5 3.91421 10.8358 4.25 11.25 4.25C11.6642 4.25 12 3.91421 12 3.5C12 3.08579 11.6642 2.75 11.25 2.75C10.8358 2.75 10.5 3.08579 10.5 3.5ZM8.75 4.25C8.33579 4.25 8 3.91421 8 3.5C8 3.08579 8.33579 2.75 8.75 2.75C9.16421 2.75 9.5 3.08579 9.5 3.5C9.5 3.91421 9.16421 4.25 8.75 4.25Z"
          fill="currentColor"
        />
      </svg>
    );
  },

    // 15 (server/db)
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <g clipPath="url(#clip0_7214_4484465)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 0.75C1.61929 0.75 0.5 1.86929 0.5 3.25V4.75C0.5 6.13071 1.61929 7.25 3 7.25H6.6462C6.817 6.9914 7.00876 6.77828 7.18722 6.61199C7.61824 6.21041 8.11231 5.938 8.55583 5.75H3C2.44772 5.75 2 5.30229 2 4.75V3.25C2 2.69772 2.44772 2.25 3 2.25H13C13.5523 2.25 14 2.69772 14 3.25V4.75C14 4.94526 13.944 5.12744 13.8473 5.2814C14.3674 5.37392 14.8648 5.50821 15.3188 5.68616C15.4357 5.39701 15.5 5.08102 15.5 4.75V3.25C15.5 1.86929 14.3807 0.75 13 0.75H3ZM3 8.25H6.20813C6.15542 8.47029 6.125 8.70747 6.125 8.96121V9.75H3C2.44772 9.75 2 10.1977 2 10.75V12.25C2 12.8023 2.44772 13.25 3 13.25H6.125V14.0388C6.125 14.2925 6.15542 14.5297 6.20813 14.75H3C1.61929 14.75 0.5 13.6307 0.5 12.25V10.75C0.5 9.36929 1.61929 8.25 3 8.25ZM5 4C5 4.41421 4.66421 4.75 4.25 4.75C3.83579 4.75 3.5 4.41421 3.5 4C3.5 3.58579 3.83579 3.25 4.25 3.25C4.66421 3.25 5 3.58579 5 4ZM6.75 4.75C7.16421 4.75 7.5 4.41421 7.5 4C7.5 3.58579 7.16421 3.25 6.75 3.25C6.33579 3.25 6 3.58579 6 4C6 4.41421 6.33579 4.75 6.75 4.75ZM12.0156 7C11.0211 7 10.0922 7.15773 9.38894 7.43489C9.03916 7.57273 8.71379 7.75239 8.46539 7.98382C8.21608 8.21611 8 8.54594 8 8.96121V11.5V14.0388C8 14.4541 8.21608 14.7839 8.46539 15.0162C8.71379 15.2476 9.03916 15.4273 9.38894 15.5651C10.0922 15.8423 11.0211 16 12.0156 16C13.0101 16 13.939 15.8423 14.6423 15.5651C14.9921 15.4273 15.3175 15.2476 15.5659 15.0162C15.8152 14.7839 16.0312 14.4541 16.0312 14.0388V11.5V8.96121C16.0312 8.54594 15.8152 8.21611 15.5659 7.98382C15.3175 7.75239 14.9921 7.57273 14.6423 7.43489C13.939 7.15773 13.0101 7 12.0156 7ZM9.31751 8.89837C9.28805 8.92582 9.27043 8.94679 9.26013 8.96121C9.27043 8.97563 9.28805 8.9966 9.31751 9.02404C9.41227 9.11233 9.58344 9.22061 9.84724 9.32457C10.3711 9.53103 11.1375 9.67241 12.0156 9.67241C12.8937 9.67241 13.6601 9.53103 14.184 9.32457C14.4478 9.22061 14.619 9.11233 14.7137 9.02404C14.7432 8.9966 14.7608 8.97563 14.7711 8.96121C14.7608 8.94679 14.7432 8.92582 14.7137 8.89837C14.619 8.81008 14.4478 8.70181 14.184 8.59784C13.6601 8.39139 12.8937 8.25 12.0156 8.25C11.1375 8.25 10.3711 8.39139 9.84724 8.59784C9.58344 8.70181 9.41227 8.81008 9.31751 8.89837ZM14.6423 10.4875C14.6891 10.4691 14.7355 10.4499 14.7812 10.4299V11.4841C14.7747 11.4962 14.757 11.5225 14.7137 11.5628C14.619 11.6511 14.4478 11.7594 14.184 11.8634C13.6601 12.0698 12.8937 12.2112 12.0156 12.2112C11.1375 12.2112 10.3711 12.0698 9.84724 11.8634C9.58344 11.7594 9.41227 11.6511 9.31751 11.5628C9.27426 11.5225 9.25654 11.4962 9.25 11.4841V10.4299C9.29579 10.4499 9.34215 10.4691 9.38894 10.4875C10.0922 10.7647 11.0211 10.9224 12.0156 10.9224C13.0101 10.9224 13.939 10.7647 14.6423 10.4875ZM14.6423 13.0263C14.6891 13.0079 14.7355 12.9887 14.7812 12.9687V14.0229C14.7747 14.035 14.757 14.0613 14.7137 14.1016C14.619 14.1899 14.4478 14.2982 14.184 14.4022C13.6601 14.6086 12.8937 14.75 12.0156 14.75C11.1375 14.75 10.3711 14.6086 9.84724 14.4022C9.58344 14.2982 9.41227 14.1899 9.31751 14.1016C9.27426 14.0613 9.25654 14.035 9.25 14.0229V12.9687C9.29579 12.9887 9.34215 13.0079 9.38894 13.0263C10.0922 13.3035 11.0211 13.4612 12.0156 13.4612C13.0101 13.4612 13.939 13.3035 14.6423 13.0263Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_7214_4484465">
            <rect width="16" height="16" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    );
  },

  // 17
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 7.6736V7V2.5H7V7V7.6736L6.49655 8.12111L4.38279 10L11.6172 10L9.50345 8.12111L9 7.6736ZM5.5 2.5H4V1H5.5H7H9H10.5H12V2.5H10.5V7L14.0735 10.1765C14.6628 10.7003 15 11.4511 15 12.2396C15 13.7641 13.7641 15 12.2396 15H3.7604C2.23587 15 1 13.7641 1 12.2396C1 11.4511 1.33718 10.7003 1.92649 10.1765L5.5 7V2.5ZM2.5 12.2396C2.5 11.9717 2.58527 11.7133 2.7398 11.5L13.2602 11.5C13.4147 11.7133 13.5 11.9717 13.5 12.2396C13.5 12.9357 12.9357 13.5 12.2396 13.5H3.7604C3.0643 13.5 2.5 12.9357 2.5 12.2396Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 18 (doc + green cube)
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <g clipPath="url(#clip0_1534_28976)">
          <path
            d="M15.25 8V2.25C15.25 1.42157 14.5784 0.75 13.75 0.75H2.25C1.42157 0.75 0.75 1.42157 0.75 2.25V13.75C0.75 14.5784 1.42157 15.25 2.25 15.25H8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
          <path
            d="M9.24618 4.25V4.25C8.00565 4.25 7 5.25565 7 6.49618L7 9.50439C7 10.7446 5.99461 11.75 4.75439 11.75V11.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M5.25 7.75H8.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M13 9L16 10.75V14.25L13 16L10 14.25V10.75L13 9Z"
            fill="#46A758"
            style={{ fillOpacity: 1 }}
          />
        </g>
        <defs>
          <clipPath id="clip0_1534_28976">
            <rect width="16" height="16" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    );
  },

  // 19 (shield + globe/scan)
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          d="M11.25 4.25V3.5C9.35033 2.86678 6 2.58921 6 0C6 2.58921 2.64967 2.86678 0.75 3.5V9.52717C0.75 11.2011 1.67915 12.7367 3.16197 13.5134L4.5 14.2143"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="transparent"
        />
        <circle
          cx="11.5"
          cy="11.5"
          r="3.875"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
        />
        <path d="M8 11.5H15.25" stroke="currentColor" strokeLinejoin="bevel" />
        <path
          d="M10.75 15V15C10.0964 12.7124 10.0964 10.2876 10.75 8V8"
          stroke="currentColor"
          strokeLinejoin="bevel"
        />
        <path
          d="M12.25 15V15C12.9036 12.7124 12.9036 10.2876 12.25 8V8"
          stroke="currentColor"
          strokeLinejoin="bevel"
        />
      </svg>
    );
  },

  // 20
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1C0 0.447716 0.447715 0 1 0H15C15.5523 0 16 0.447716 16 1V10C16 10.5523 15.5523 11 15 11H12.5V9.5H14.5V1.5H1.5V9.5H3.5V11H1C0.447715 11 0 10.5523 0 10V1ZM8 14C6.84509 14 5.76659 14.5772 5.12596 15.5381L5 15.7271V16H3.5V15.5V15.2729L3.62596 15.084L3.87789 14.7061C4.79671 13.3278 6.34356 12.5 8 12.5C9.65644 12.5 11.2033 13.3278 12.1221 14.7061L12.374 15.084L12.5 15.2729V15.5V16H11V15.7271L10.874 15.5381C10.2334 14.5772 9.15491 14 8 14ZM7.75 6C6.50736 6 5.5 7.00736 5.5 8.25V8.75C5.5 9.99264 6.50736 11 7.75 11H8.25C9.49264 11 10.5 9.99264 10.5 8.75V8.25C10.5 7.00736 9.49264 6 8.25 6H7.75ZM7 8.25C7 7.83579 7.33579 7.5 7.75 7.5H8.25C8.66421 7.5 9 7.83579 9 8.25V8.75C9 9.16421 8.66421 9.5 8.25 9.5H7.75C7.33579 9.5 7 9.16421 7 8.75V8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 21
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.35066 2.06247C5.96369 1.78847 6.62701 1.60666 7.32351 1.53473L7.16943 0.0426636C6.31208 0.1312 5.49436 0.355227 4.73858 0.693033L5.35066 2.06247ZM8.67651 1.53473C11.9481 1.87258 14.5 4.63876 14.5 8.00001C14.5 11.5899 11.5899 14.5 8.00001 14.5C4.63901 14.5 1.87298 11.9485 1.5348 8.67722L0.0427551 8.83147C0.459163 12.8594 3.86234 16 8.00001 16C12.4183 16 16 12.4183 16 8.00001C16 3.86204 12.8589 0.458666 8.83059 0.0426636L8.67651 1.53473ZM2.73972 4.18084C3.14144 3.62861 3.62803 3.14195 4.18021 2.74018L3.29768 1.52727C2.61875 2.02128 2.02064 2.61945 1.52671 3.29845L2.73972 4.18084ZM1.5348 7.32279C1.60678 6.62656 1.78856 5.96348 2.06247 5.35066L0.693033 4.73858C0.355343 5.4941 0.131354 6.31152 0.0427551 7.16854L1.5348 7.32279ZM8.75001 4.75V4H7.25001V4.75V7.875C7.25001 8.18976 7.3982 8.48615 7.65001 8.675L9.55001 10.1L10.15 10.55L11.05 9.35L10.45 8.9L8.75001 7.625V4.75Z"
          fill="currentColor"
        />
      </svg>
    );
  },

  // 22 (user + gear)
  (props) => {
    const { size, rest } = makeProps(props);
    return (
      <svg
        data-testid="geist-icon"
        height={size}
        width={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        style={{ color: "currentColor" }}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 3.25C2.5 1.45507 3.95507 0 5.75 0H6.25C8.04493 0 9.5 1.45507 9.5 3.25V3.75C9.5 5.54493 8.04493 7 6.25 7H5.75C3.95507 7 2.5 5.54493 2.5 3.75V3.25ZM5.75 1.5C4.7835 1.5 4 2.2835 4 3.25V3.75C4 4.7165 4.7835 5.5 5.75 5.5H6.25C7.2165 5.5 8 4.7165 8 3.75V3.25C8 2.2835 7.2165 1.5 6.25 1.5H5.75ZM1.5 13.1694C2.32482 11.4909 3.71318 10.5 5.5 10.5V9C2.97349 9 1.0827 10.4894 0.0690305 12.6857L0 12.8353V13V15.25V16H0.75H5.5V14.5H1.5V13.1694ZM10.0915 10.2175C10.4564 10.0309 10.7944 9.70265 10.9642 9.25H11.0358C11.2056 9.70265 11.5436 10.0309 11.9085 10.2175C11.9698 10.2488 12.0294 10.2833 12.0871 10.3208C12.4317 10.5446 12.886 10.6736 13.3637 10.5941L13.3994 10.6559C13.0923 11.0289 12.9765 11.4857 12.9973 11.8955C12.9991 11.93 13 11.9649 13 12C13 12.0351 12.9991 12.07 12.9973 12.1044C12.9765 12.5143 13.0923 12.9711 13.3994 13.3441L13.3637 13.4059C12.886 13.3264 12.4317 13.4554 12.0871 13.6792C12.0294 13.7167 11.9698 13.7512 11.9085 13.7825C11.5436 13.9691 11.2056 14.2973 11.0358 14.75H10.9642C10.7944 14.2973 10.4564 13.9691 10.0915 13.7825C10.0302 13.7512 9.97058 13.7167 9.91294 13.6792C9.56829 13.4554 9.11402 13.3264 8.63627 13.4059L8.60059 13.3441C8.90769 12.9711 9.02353 12.5144 9.00265 12.1045C9.00089 12.07 9 12.0351 9 12C9 11.9649 9.00089 11.93 9.00265 11.8955C9.02353 11.4856 8.9077 11.0289 8.60061 10.6559L8.63629 10.5941C9.11403 10.6736 9.56829 10.5446 9.91295 10.3208C9.97059 10.2833 10.0302 10.2488 10.0915 10.2175ZM14.4037 11.4079L14.9641 10.866L13.9641 9.13398L13.215 9.34827C13.0629 9.39177 12.9006 9.35863 12.7679 9.27247C12.6743 9.21169 12.5774 9.15559 12.4775 9.1045C12.3369 9.03257 12.2272 8.90865 12.1888 8.75537L12 8H10L9.81116 8.75537C9.77284 8.90865 9.66315 9.03257 9.52247 9.1045C9.42257 9.15558 9.32566 9.21168 9.23208 9.27247C9.09943 9.35862 8.93709 9.39176 8.78502 9.34826L8.03591 9.13397L7.03591 10.866L7.5963 11.4079C7.70977 11.5176 7.7623 11.6743 7.75427 11.8319C7.75143 11.8876 7.75 11.9436 7.75 12C7.75 12.0564 7.75143 12.1124 7.75427 12.168C7.7623 12.3257 7.70977 12.4824 7.5963 12.5921L7.03589 13.134L8.03589 14.866L8.78501 14.6517C8.93708 14.6082 9.09942 14.6414 9.23207 14.7275C9.32566 14.7883 9.42257 14.8444 9.52248 14.8955C9.66315 14.9674 9.77284 15.0913 9.81116 15.2446L10 16H12L12.1888 15.2446C12.2272 15.0913 12.3369 14.9674 12.4775 14.8955C12.5774 14.8444 12.6743 14.7883 12.7679 14.7275C12.9006 14.6414 13.0629 14.6082 13.215 14.6517L13.9641 14.866L14.9641 13.134L14.4037 12.5921C14.2902 12.4824 14.2377 12.3257 14.2457 12.168C14.2486 12.1124 14.25 12.0564 14.25 12C14.25 11.9436 14.2486 11.8876 14.2457 11.832C14.2377 11.6743 14.2902 11.5176 14.4037 11.4079Z"
          fill="currentColor"
        />
      </svg>
    );
  },
];

// Build a per-plan offset so features get icons in the exact order across cards.
const planFeatureOffset: Record<Plan["key"], number> = (() => {
  let offset = 0;
  const map = {} as Record<Plan["key"], number>;
  for (const p of plans) {
    map[p.key] = offset;
    offset += p.features.length;
  }
  return map;
})();

function RollingNumber({ value }: { value: number }) {
  const digits = useMemo(() => value.toString().split(""), [value]);

  return (
    <span className="rollNumber__9G01K" aria-label={value.toString()}>
      {digits.map((d, i) => {
        const n = Number(d);
        return (
          <span key={i} className="rollDigit__9G01K">
            <span
              className="rollDigitInner__9G01K"
              style={{ transform: `translateY(-${n * 10}%)` }}
            >
              {Array.from({ length: 10 }, (_, tick) => (
                <span key={tick} className="rollTick">
                  {tick}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function PricingSectionCardModule() {
  const [isYearly, setIsYearly] = useState(true);

  // "All X features, plus:" text per plan
  const includedFeaturesLabel: Partial<Record<Plan["key"], string>> = {
    plus: "All Hobby features, plus:",
    business: "All Plus features, plus:",
    enterprise: "All Business features, plus:",
  };

  return (
    <TooltipProvider>
      <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <h1
          className="typography__heading1__T3m8s"
          style={{ margin: 0, textAlign: "center" }}
        >
          Pricing
        </h1>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <p
          className="typography__subtitle__R6m2x"
          style={{ margin: 0, textAlign: "center" }}
        >
          Built on Next.js + Vercel or Shopify for commerce.
          <br aria-hidden="true" />
          Upgrade to enable more insights, enhanced security and additional
          features.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "112px" } as CSSProperties}
        />

        <div className="pricing__grid__L7p3s">
          {plans.map((plan) => {
            const amount =
              plan.showBillingToggle && plan.monthlyAmount && plan.yearlyAmount
                ? isYearly
                  ? plan.yearlyAmount
                  : plan.monthlyAmount
                : null;

            const topLabel = includedFeaturesLabel[plan.key];
            const baseIconIndex = planFeatureOffset[plan.key];

            return (
              <article
                key={plan.key}
                className="module__card__H5k8q"
                data-highlighted={plan.highlighted ? "true" : "false"}
              >
                <div className="pricing__card-top__A1b2c">
                  <h4
                    className="typography__heading4__Z7p4s"
                    style={{ margin: 0, paddingInline: 24 }}
                  >
                    {plan.name}
                  </h4>

                  <div
                    className="Spacer-module__root__NM019"
                    style={{ "--height": "12px" } as CSSProperties}
                  />

                  <div className="pricing__price__T7g2m">
                    <span className="typography__body__K4n7p">
                      {plan.description}
                    </span>

                    <span className="typography__body__K4n7p bitC1">
                      {amount != null ? (
                        <>
                          $<RollingNumber value={amount} />
                          {plan.priceSuffix}
                        </>
                      ) : plan.priceHref ? (
                        <a
                          href={plan.priceHref}
                          className="typography__link__B7s3m"
                        >
                          {plan.priceText}
                        </a>
                      ) : (
                        plan.priceText
                      )}
                    </span>

                    <span className="typography__body__K4n7p">
                      {plan.description2}
                    </span>
                  </div>

                  <div className="pricing__billing__C2d3e">
                    {plan.showBillingToggle && (
                      <div
                        className="root__toggle-wrapper__T7g2m"
                        style={{ scale: 0.7, margin: "0 2px 0 -6px" }}
                      >
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          checked={isYearly}
                          onChange={(e) => setIsYearly(e.target.checked)}
                        />
                        <label
                          className="root__toggle-btn__T7g2m"
                          htmlFor={`billingToggle-${plan.key}`}
                        />
                      </div>
                    )}

                    <span className="typography__small__Q9j2p">
                      {plan.billingLabelYearly}
                    </span>
                  </div>
                </div>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

                {/* Label above features list */}
                {topLabel && (
                  <p
                    className="typography__small__Q9j2p"
                    style={{ padding: "0 24px 10px" }}
                  >
                    {topLabel}
                  </p>
                )}

                <ul className="pricing__features__M93j8">
                  {plan.features.map((feature, i) => {
                    const Icon = FeatureIcons[baseIconIndex + i];
                    const isObject = typeof feature === 'object';
                    const featureText = isObject ? feature.text : feature;
                    const featureTooltip = isObject ? feature.tooltip : null;

                    return (
                      <li key={`${plan.key}-${i}-${featureText}`} className="pricing__feature__P5k8p">
                        <span className="pricing__check__Z3n7q" aria-hidden="true">
                          {Icon ? <Icon size={16} /> : null}
                        </span>

                        {featureTooltip ? (
                          <Tooltip content={featureTooltip} position="right">
                            <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p pricing__feature-with-tooltip__W7m3k">
                              {featureText}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p">
                            {featureText}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

                <div className="pricing__actions__Q6z2k">
                  <a
                    href={plan.cta.href}
                    className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h pricing__cta__X1y2z"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{plan.cta.label}</span>
                  </a>

                  {plan.showAltSalesLink && (
                    <p
                      className="typography__small__Q9j2p pricing__alt__P5k8p"
                      style={{ margin: 0 }}
                    >
                      or{" "}
                      <a href="/contact" className="typography__link__B7s3m">
                        Talk to sales
                      </a>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      </section>
    </TooltipProvider>
  );
}
