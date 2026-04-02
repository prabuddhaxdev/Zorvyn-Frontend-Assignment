import { Brain, Clock, FileText, Target } from "lucide-react";


const stats = [
  {
    number: "99.9%",
    label: "Accuracy Rate",
    icon: <Target className="w-5 h-5" />,
  },
  {
    number: "<3s",
    label: "Processing Time",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    number: "50+",
    label: "Receipt Types",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    number: "24/7",
    label: "AI Availability",
    icon: <Brain className="w-5 h-5" />,
  },
];

const images = {
  "item-1": {
    image: create,
    alt: "AI receipt scanning interface",
  },
  "item-2": {
    image: dashboard,
    alt: "Analytics dashboard with charts and budget tracking",
  },
  "item-3": {
    image: table,
    alt: "Transaction history table with filters and sorting",
  },
};



