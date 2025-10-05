import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { AnalysisReport } from "@/components/AnalysisReport";
import { FeatureCards } from "@/components/FeatureCards";
import { BiasComparison } from "@/components/BiasComparison";
import { About } from "@/components/About";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  biasScore: number;
  ethicsRadar: {
    fairness: number;
    transparency: number;
    privacy: number;
    accountability: number;
    safety: number;
  };
  summary: string;
  keyFindings: string[];
  recommendations: string[];
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [comparisonData, setComparisonData] = useState<{ original: string; unbiased: string } | null>(null);
  const [isMitigating, setIsMitigating] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    analysisRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async (content: string) => {
    setIsAnalyzing(true);
    setOriginalContent(content);
    setComparisonData(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-document', {
        body: { content }
      });

      if (error) throw error;

      setAnalysisResult(data);
      
      toast({
        title: "Analysis Complete",
        description: "Your content has been analyzed for ethics and bias.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMitigateBias = async () => {
    if (!originalContent || !analysisResult) return;

    setIsMitigating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mitigate-bias', {
        body: { 
          content: originalContent,
          findings: analysisResult.keyFindings
        }
      });

      if (error) throw error;

      setComparisonData(data);
      
      toast({
        title: "Mitigation Complete",
        description: "Unbiased version has been generated successfully.",
      });
    } catch (error: any) {
      console.error("Mitigation error:", error);
      toast({
        title: "Mitigation Failed",
        description: error.message || "Failed to generate unbiased version. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMitigating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-xl font-bold text-white">EB</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif' }}>
              Ethic & Bias
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 hover:text-foreground transition-colors font-medium">Home</button>
            <button onClick={scrollToFeatures} className="text-foreground/80 hover:text-foreground transition-colors font-medium">Features</button>
            <button onClick={scrollToAnalysis} className="text-foreground/80 hover:text-foreground transition-colors font-medium">Analysis</button>
            <button onClick={scrollToAbout} className="text-foreground/80 hover:text-foreground transition-colors font-medium">About</button>
          </div>

          <button onClick={handleGetStarted} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 font-medium">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <div ref={featuresRef}>
        <FeatureCards />
      </div>

      {/* About Section */}
      <div ref={aboutRef}>
        <About />
      </div>

      {/* Analysis Section */}
      <section ref={analysisRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Zone */}
            <div>
              <UploadZone onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Analysis Report */}
            <div>
              {analysisResult ? (
                <AnalysisReport 
                  result={analysisResult} 
                  onMitigateBias={handleMitigateBias}
                  isMitigating={isMitigating}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
                  <p className="text-center text-muted-foreground">
                    Upload a document or paste text to see your analysis report here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bias Comparison */}
          {comparisonData && (
            <BiasComparison 
              original={comparisonData.original}
              unbiased={comparisonData.unbiased}
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Ethic & Bias. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
