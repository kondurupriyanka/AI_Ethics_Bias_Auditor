import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-50" />
      
      {/* Glow orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Ethic & Bias</span> Detection
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Advanced AI-powered analysis to identify and eliminate ethical concerns and biases in your content and systems.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/60 hover:scale-105 font-semibold"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={onGetStarted}
            className="border-border hover:bg-card/50 backdrop-blur-sm font-semibold"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
