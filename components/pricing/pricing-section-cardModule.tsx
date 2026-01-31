"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-cardModule.css";

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
  features: string[];
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
      "Automatic CI/CD",
      "Web Application Firewall",
      "DDoS Mitigation",
      "Basic SEO",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "plus",
    name: "Plus",
    monthlyAmount: 12,
    yearlyAmount: 10,
    priceSuffix: "/mo",
    description: "",
    description2: " + additional features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Cold start prevention",
      "Traffic & performance insights",
      "Content structure + conversion guidance",
      "Enhanced SEO + analytics",
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
    monthlyAmount: 18,
    yearlyAmount: 16,
    priceSuffix: "/mo",
    description: "",
    description2: " + advanced features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Faster builds with prioritized CI",
      "Advanced caching & ISR configuration",
      "Technical SEO improvements",
      "Performance budgets (Core Web Vitals)",
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
      "Advanced security (SSO, RBAC)",
      "Compliance support (SOC 2, GDPR)",
      "Custom SLAs & uptime guarantees",
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

  // 2
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
          d="M5.75 7L6.4209 7.33594L4.85254 10.4717C5.38789 10.771 5.75 11.3431 5.75 12V14C5.75 14.9665 4.96648 15.75 4 15.75H2C1.03352 15.75 0.25 14.9665 0.25 14V12C0.25 11.0335 1.03352 10.25 2 10.25H3.28711L5.0791 6.66504L5.75 7ZM14 10.25C14.9665 10.25 15.75 11.0335 15.75 12V14C15.75 14.9665 14.9665 15.75 14 15.75H12C11.1185 15.75 10.3909 15.098 10.2695 14.25H7V12.75H10.25V12C10.25 11.0335 11.0335 10.25 12 10.25H14ZM2 11.75C1.86192 11.75 1.75 11.8619 1.75 12V14C1.75 14.1381 1.86192 14.25 2 14.25H4C4.13808 14.25 4.25 14.1381 4.25 14V12C4.25 11.8619 4.13808 11.75 4 11.75H2ZM12 11.75C11.8619 11.75 11.75 11.8619 11.75 12V14C11.75 14.1381 11.8619 14.25 12 14.25H14C14.1381 14.25 14.25 14.1381 14.25 14V12C14.25 11.8619 14.1381 11.75 14 11.75H12ZM9 0.25C9.96649 0.25 10.75 1.03351 10.75 2V4C10.75 4.44642 10.5808 4.85197 10.3057 5.16113L12.2041 8.6416L10.8877 9.36035L8.91895 5.75H7C6.03351 5.75 5.25 4.96649 5.25 4V2C5.25 1.03351 6.03351 0.25 7 0.25H9ZM7 1.75C6.86193 1.75 6.75 1.86193 6.75 2V4C6.75 4.13807 6.86193 4.25 7 4.25H9C9.13807 4.25 9.25 4.13807 9.25 4V2C9.25 1.86193 9.13807 1.75 9 1.75H7Z"
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
          d="M13.5 1.5H2.5V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5H12.5C13.0523 14.5 13.5 14.0523 13.5 13.5V1.5ZM2.5 0H1V1.5V13.5C1 14.8807 2.11929 16 3.5 16H12.5C13.8807 16 15 14.8807 15 13.5V1.5V0H13.5H2.5ZM9.75 4.5C9.19772 4.5 8.75 4.94772 8.75 5.5V6.5H9.75H10.5V8H9.75H8.75V10.5C8.75 11.8807 7.63071 13 6.25 13H5.5V11.5H6.25C6.80228 11.5 7.25 11.0523 7.25 10.5V8H6.25H5.5V6.5H6.25H7.25V5.5C7.25 4.11929 8.36929 3 9.75 3H10.5V4.5H9.75Z"
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

  // 14
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
          className="typography__emphasize__M9J2o"
          style={{ margin: 0, textAlign: "center" }}
        >
          Built on Next.js + Vercel, with Shopify-ready options for commerce.
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
                  {plan.features.map((f, i) => {
                    const Icon = FeatureIcons[baseIconIndex + i];

                    return (
                      <li key={`${plan.key}-${i}-${f}`} className="pricing__feature__P5k8p">
                        <span className="pricing__check__Z3n7q" aria-hidden="true">
                          {Icon ? <Icon size={16} /> : null}
                        </span>

                        <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p">
                          {f}
                        </span>
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
  );
}
