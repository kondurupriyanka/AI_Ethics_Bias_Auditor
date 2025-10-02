import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Sparkles, Brain, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link to="/">
            <motion.img 
              src="/src/assets/ethifind-logo.svg" 
              alt="EthiFind Logo" 
              className="h-10 w-10"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>
          <h1 className="text-xl font-bold">EthiFind</h1>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex items-center gap-6"
        >
          <Link to="/" className="text-white/80 hover:text-white transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/features" className="text-white relative group">
            Features
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
          </Link>
          <Link to="/documentation" className="text-white/80 hover:text-white transition-colors relative group">
            Documentation
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.nav>
        
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" className="hidden md:flex border-indigo-500 text-white hover:bg-indigo-600 hover:text-white transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span> for Ethical AI
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to help you identify and mitigate bias in your AI systems and content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full">
              <CardHeader>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-2"
                >
                  <Shield className="h-12 w-12 text-indigo-400" />
                </motion.div>
                <CardTitle className="text-xl text-white">Bias Detection</CardTitle>
                <CardDescription className="text-white/70">
                  Advanced algorithms to identify potential biases in your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Identifies gender, racial, and cultural biases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Analyzes language patterns and sentiment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Provides bias score with detailed breakdown</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full">
              <CardHeader>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-2"
                >
                  <Brain className="h-12 w-12 text-purple-400" />
                </motion.div>
                <CardTitle className="text-xl text-white">Ethical Analysis</CardTitle>
                <CardDescription className="text-white/70">
                  Comprehensive ethical framework assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Evaluates fairness, transparency, and accountability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Assesses privacy and safety considerations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Provides radar chart visualization of ethical dimensions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full">
              <CardHeader>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-2"
                >
                  <Lightbulb className="h-12 w-12 text-amber-400" />
                </motion.div>
                <CardTitle className="text-xl text-white">Mitigation Recommendations</CardTitle>
                <CardDescription className="text-white/70">
                  Actionable insights to improve ethical alignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Suggests specific language and content improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Provides alternative phrasing options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Offers educational resources for deeper understanding</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-indigo-900/30 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>© 2023 EthiFind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;