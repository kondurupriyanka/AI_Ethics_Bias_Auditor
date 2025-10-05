import { Card } from "@/components/ui/card";
import { Target, Shield, Zap, Users } from "lucide-react";

export const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">Ethic & Bias</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your trusted platform for identifying and eliminating bias in AI systems and content
          </p>
        </div>

        {/* What it does */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">What We Do</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glow-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Advanced Bias Detection</h4>
              <p className="text-muted-foreground leading-relaxed">
                Our AI-powered system analyzes your content for gender, racial, age, and cultural biases using cutting-edge machine learning models. We provide detailed insights into potential issues that might go unnoticed.
              </p>
            </Card>

            <Card className="glow-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold">Ethics Assessment</h4>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive evaluation across five critical dimensions: fairness, transparency, privacy, accountability, and safety. Get a complete picture of your content's ethical standing.
              </p>
            </Card>

            <Card className="glow-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Automated Mitigation</h4>
              <p className="text-muted-foreground leading-relaxed">
                Not just detection—we generate improved, unbiased versions of your content while maintaining the original meaning and intent. Compare side-by-side to see the transformation.
              </p>
            </Card>

            <Card className="glow-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold">Actionable Recommendations</h4>
              <p className="text-muted-foreground leading-relaxed">
                Receive specific, practical recommendations to improve your content and processes. Build a more inclusive and ethical AI system with our expert guidance.
              </p>
            </Card>
          </div>
        </div>

        {/* Why use it */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">Why Use Ethic & Bias?</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 border-l-4 border-primary">
              <h4 className="text-xl font-semibold mb-3">Build Trust with Your Audience</h4>
              <p className="text-muted-foreground leading-relaxed">
                In today's world, users demand fairness and transparency. Ensure your AI systems and content meet the highest ethical standards to build lasting trust with your audience.
              </p>
            </Card>

            <Card className="p-8 border-l-4 border-accent">
              <h4 className="text-xl font-semibold mb-3">Reduce Risk & Liability</h4>
              <p className="text-muted-foreground leading-relaxed">
                Biased AI systems can lead to legal challenges, reputation damage, and lost revenue. Proactively identify and address issues before they become problems.
              </p>
            </Card>

            <Card className="p-8 border-l-4 border-primary">
              <h4 className="text-xl font-semibold mb-3">Stay Ahead of Regulations</h4>
              <p className="text-muted-foreground leading-relaxed">
                With AI regulations evolving globally, ensure your systems are compliant and ready for future requirements. Our platform helps you maintain ethical standards that exceed regulatory expectations.
              </p>
            </Card>

            <Card className="p-8 border-l-4 border-accent">
              <h4 className="text-xl font-semibold mb-3">Improve Decision Quality</h4>
              <p className="text-muted-foreground leading-relaxed">
                Biased data leads to biased decisions. Clean your data and processes to make better, more accurate decisions that serve all users fairly and effectively.
              </p>
            </Card>
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">How It Works</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
              
              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "Upload or Paste Your Content",
                    description: "Simply upload a document or paste text directly into our platform. We support various formats and content types."
                  },
                  {
                    step: "2",
                    title: "AI Analysis in Seconds",
                    description: "Our advanced AI models analyze your content across multiple dimensions, identifying potential biases and ethical concerns with precision."
                  },
                  {
                    step: "3",
                    title: "Review Detailed Report",
                    description: "Get comprehensive visualizations, bias scores, ethics radar charts, and specific findings with examples from your content."
                  },
                  {
                    step: "4",
                    title: "Generate Unbiased Version",
                    description: "With one click, create an improved version of your content. Compare original vs. unbiased side-by-side to see the improvements."
                  },
                  {
                    step: "5",
                    title: "Implement Recommendations",
                    description: "Apply our actionable recommendations to your processes and systems for long-term improvement and ethical excellence."
                  }
                ].map((item) => (
                  <div key={item.step} className="relative flex items-start gap-6 ml-16">
                    <div className="absolute -left-16 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
