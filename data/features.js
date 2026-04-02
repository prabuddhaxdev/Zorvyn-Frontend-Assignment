import {
  BarChart3,
  CreditCard,
  Globe,
  PieChart,
  Receipt,
  ScanLine,
  Table,
  Zap,
} from "lucide-react";

const features = [
  {
    key: "item-1",
    icon: ScanLine,
    title: "AI Receipt Scanning",
    description:
      "Simply snap a photo of any receipt and let our advanced AI extract all transaction details automatically. No more manual data entry - from merchant names to amounts and categories, everything is captured instantly with industry-leading accuracy.",
  },
  {
    key: "item-2",
    icon: BarChart3,
    title: "Visual Analytics Dashboard",
    description:
      "Get comprehensive insights with interactive charts showing your spending patterns, weekly transaction summaries, and monthly budget tracking. Monitor your financial health with beautiful visualizations that make complex data easy to understand.",
  },
  {
    key: "item-3",
    icon: Table,
    title: "Smart Transaction Management",
    description:
      "Access your complete transaction history through an advanced table interface with powerful filtering and sorting capabilities. Search by date, amount, category, or merchant to find exactly what you need in seconds.",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];
