import { Card } from "@/components/ui/card";
import { Shield, Brain, Lightbulb, BarChart3, FileSearch, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bias Detection",
    description: "Advanced algorithms to identify potential biases in your content",
    items: [
      "Identifies gender, racial, and cultural biases",
      "Analyzes language patterns and sentiment",
      "Provides bias score with detailed breakdown"
    ]
  },
  {
    icon: Brain,
    title: "Ethical Analysis",
    description: "Comprehensive ethical framework assessment",
    items: [
      "Evaluates fairness, transparency, and accountability",
      "Assesses privacy and safety considerations",
      "Provides radar chart visualization of ethical dimensions"
    ]
  },
  {
    icon: Lightbulb,
    title: "Mitigation Recommendations",
    description: "Actionable insights to improve ethical alignment",
    items: [
      "Suggests specific language and content improvements",
      "Provides alternative phrasing options",
      "Offers educational resources for deeper understanding"
    ]
  },
  {
    icon: BarChart3,
    title: "Comprehensive Analysis",
    description: "Detailed metrics and impact across multiple dimensions",
    items: [
      "Multi-dimensional bias scoring",
      "Trend analysis and patterns",
      "Contextual risk assessment"
    ]
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Advanced document parsing and analysis",
    items: [
      "Supports multiple file formats",
      "Contextual understanding with RAG",
      "Interactive Q&A about findings"
    ]
  },
  {
    icon: RefreshCw,
    title: "Automated Rewriting",
    description: "AI-powered content improvement",
    items: [
      "Generates unbiased alternatives",
      "Maintains original meaning and tone",
      "Side-by-side comparison views"
    ]
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful <span className="gradient-text">Features</span> for Ethical AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to help you identify and mitigate bias in your AI systems and content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glow-card p-6 space-y-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>

                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
