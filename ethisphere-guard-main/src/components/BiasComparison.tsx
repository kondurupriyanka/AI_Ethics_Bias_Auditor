import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface BiasComparisonProps {
  original: string;
  unbiased: string;
}

export const BiasComparison = ({ original, unbiased }: BiasComparisonProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-6 h-6 text-accent" />
        <h3 className="text-2xl font-bold gradient-text">Bias Mitigation Results</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Content */}
        <Card className="p-6 border-2 border-destructive/30 bg-card/50 backdrop-blur">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-medium mb-3">
              Original (Biased)
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {original}
            </div>
          </div>
        </Card>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Unbiased Content */}
        <Card className="p-6 border-2 border-accent/30 bg-card/50 backdrop-blur">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-3">
              Improved (Unbiased)
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {unbiased}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p>Content has been rewritten to remove bias while maintaining original meaning</p>
      </div>
    </div>
  );
};
