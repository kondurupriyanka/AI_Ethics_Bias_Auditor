import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
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
          <Link to="/features" className="text-white/80 hover:text-white transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/documentation" className="text-white/80 hover:text-white transition-colors relative group">
            Documentation
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" className="text-white relative group">
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
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
            About <span className="gradient-text">EthiFind</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Our mission is to make AI systems more ethical, transparent, and fair for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              At EthiFind, we believe that AI systems should be designed and deployed with ethical considerations at their core. Our mission is to provide tools and frameworks that help developers, organizations, and individuals identify and mitigate bias in AI systems and content.
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">
              We're committed to promoting fairness, transparency, accountability, privacy, safety, and inclusivity in AI development and deployment. By making these ethical considerations accessible and actionable, we aim to contribute to a more equitable digital future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/60 border border-indigo-900/30 shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Fairness</h3>
                  <p className="text-white/70">Ensuring AI systems treat all individuals and groups equitably</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Transparency</h3>
                  <p className="text-white/70">Making AI systems understandable and explainable</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Accountability</h3>
                  <p className="text-white/70">Taking responsibility for the impacts of AI systems</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Inclusivity</h3>
                  <p className="text-white/70">Designing AI systems that work for everyone</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JD</span>
              </div>
              <h3 className="text-lg font-bold text-white">Jane Doe</h3>
              <p className="text-white/70">Founder & CEO</p>
            </Card>
            
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JS</span>
              </div>
              <h3 className="text-lg font-bold text-white">John Smith</h3>
              <p className="text-white/70">Chief Technology Officer</p>
            </Card>
            
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AJ</span>
              </div>
              <h3 className="text-lg font-bold text-white">Alex Johnson</h3>
              <p className="text-white/70">Lead AI Ethicist</p>
            </Card>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              Try EthiFind Now
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

export default About;