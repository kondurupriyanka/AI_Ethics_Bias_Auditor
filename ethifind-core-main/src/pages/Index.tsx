import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Shield, Sparkles, Loader2, Upload, X, CheckCircle2, 
  AlertCircle, BarChart4, FileBarChart, Scale, Brain, Lightbulb, 
  Gauge, ArrowRight, Menu, ChevronRight, PieChart, LineChart
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/ethifind-logo.svg";
import biasChart from "@/assets/bias-chart.svg";
import ethicsRadar from "@/assets/ethics-radar.svg";

const Index = () => {
  const [documentText, setDocumentText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const allowedTypes = [
      'text/csv',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|pdf|xlsx|xls|txt)$/i)) {
      toast.error("Please upload a CSV, PDF, Excel, or TXT file");
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      let extractedText = "";

      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        extractedText = await file.text();
      } else if (file.type.includes('sheet') || file.name.match(/\.(xlsx|xls)$/i)) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const sheets = workbook.SheetNames.map(name => {
          const sheet = workbook.Sheets[name];
          return `Sheet: ${name}\n${XLSX.utils.sheet_to_csv(sheet)}`;
        });
        extractedText = sheets.join('\n\n');
      } else if (file.type === 'application/pdf') {
        toast.info("PDF processing may take a moment...");
        extractedText = await file.text();
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        extractedText = await file.text();
      }

      setDocumentText(extractedText);
      toast.success(`File "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error('File processing error:', error);
      toast.error("Failed to process file");
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setDocumentText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      toast.error("Please enter document text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const { data, error } = await supabase.functions.invoke('analyze-ethics', {
        body: { documentText }
      });

      if (error) {
        console.error('Function error:', error);
        if (error.message?.includes('429')) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (error.message?.includes('402')) {
          toast.error("Please add credits to continue using the AI analysis.");
        } else {
          toast.error("Analysis failed. Please try again.");
        }
        return;
      }

      if (data?.analysis) {
        setAnalysis(data.analysis);
        toast.success("Analysis complete!");
      } else {
        toast.error("No analysis was generated. Please try again.");
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0], 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 
        }}
      />
      
      {/* Modern Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-indigo-900/30 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-md"
      >
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img 
                src={logo} 
                alt="EthiFind" 
                className="h-10 w-10" 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  EthiFind<span className="text-indigo-400">.</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  AI Ethics & Bias Analysis
                </p>
              </div>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-6">
              {["Home", "Features", "Documentation", "About"].map((item, index) => (
                <motion.a 
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                  className={`text-sm font-medium ${item === "Home" ? "text-white" : "text-slate-300"} hover:text-indigo-400 transition-colors relative group`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </nav>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-950 py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjEwMDAiIGN5PSIxMDAwIiByPSI4MDAiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSIxIDEyIiBvcGFjaXR5PSIwLjEiLz48Y2lyY2xlIGN4PSIxMDAwIiBjeT0iMTAwMCIgcj0iNDAwIiBzdHJva2U9IiM0ZjQ2ZTUiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMSA4IiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              AI <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >Ethics & Bias</motion.span> Auditor
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Professional analysis to identify and mitigate ethical concerns and biases in your AI systems and content.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium relative overflow-hidden group"
                  onClick={() => {
                    const analysisSection = document.getElementById('analysis-section');
                    if (analysisSection) analysisSection.scrollIntoView({ behavior: 'smooth' });
                    else document.getElementById('file-upload')?.click();
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/features">
                  <Button 
                    variant="outline" 
                    className="border-indigo-600 text-indigo-400 hover:bg-indigo-950 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-indigo-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12 max-w-7xl -mt-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="relative overflow-hidden bg-slate-900/60 border border-indigo-900/30 shadow-lg rounded-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <FileText className="h-5 w-5 text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Document Analysis</CardTitle>
              </div>
              <CardDescription className="text-slate-400 mt-1">
                Upload or paste your content for ethical assessment and bias detection
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6 bg-slate-800/50">
                  <TabsTrigger value="upload" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="paste" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Paste Text
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-0">
                  {/* File Upload Area */}
                  <div className="mb-4">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.pdf,.xlsx,.xls,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-500/30 rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-5">
                        <div className="p-2 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors mb-2">
                          <Upload className="h-5 w-5 text-indigo-400" />
                        </div>
                        <p className="text-sm font-medium text-white mb-1">
                          <span className="text-indigo-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          CSV, PDF, Excel, or TXT (max 10MB)
                        </p>
                      </div>
                    </label>

                    {uploadedFile && (
                      <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isProcessing ? (
                            <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                          )}
                          <span className="text-sm font-medium text-white truncate max-w-xs">
                            {uploadedFile.name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFile}
                          disabled={isProcessing}
                          className="h-7 w-7 p-0 text-slate-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="paste" className="mt-0">
                  <div className="relative">
                    <div className="absolute top-3 right-3 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20 z-10">
                      {documentText.length.toLocaleString()} chars
                    </div>
                    <Textarea
                      value={documentText}
                      onChange={(e) => setDocumentText(e.target.value)}
                      placeholder="Paste your document, dataset excerpt, or text here for comprehensive analysis..."
                      className="min-h-[280px] resize-none font-mono text-sm bg-slate-800/50 border-slate-700 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 pr-24 rounded-lg"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-end pt-2">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !documentText.trim() || isProcessing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Ethics & Bias
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative overflow-hidden bg-slate-900/60 border border-indigo-900/30 shadow-lg rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <Shield className="h-5 w-5 text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Analysis Report</CardTitle>
                </div>
                <CardDescription className="text-slate-400 mt-1">
                  Comprehensive ethics and bias assessment with actionable recommendations
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="min-h-[540px] max-h-[640px] overflow-y-auto rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  {isAnalyzing ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center h-full text-center py-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
                        <Loader2 className="relative h-12 w-12 text-indigo-400 animate-spin mb-6" />
                      </div>
                      <p className="text-white font-medium text-lg mb-2">Processing Your Document</p>
                      <p className="text-slate-400 text-sm">Analyzing for ethical concerns and biases...</p>
                    </motion.div>
                  ) : analysis ? (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <motion.div 
                          className="bg-slate-800/60 p-4 rounded-lg border border-indigo-900/30"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                            <PieChart className="h-5 w-5 mr-2 text-indigo-400" />
                            Bias Score Visualization
                          </h3>
                          <div className="flex justify-center">
                            <img src={biasChart} alt="Bias Score Chart" className="h-40" />
                          </div>
                        </motion.div>
                        <motion.div 
                          className="bg-slate-800/60 p-4 rounded-lg border border-indigo-900/30"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                            <LineChart className="h-5 w-5 mr-2 text-indigo-400" />
                            Ethics Radar Analysis
                          </h3>
                          <div className="flex justify-center">
                            <img src={ethicsRadar} alt="Ethics Radar Chart" className="h-40" />
                          </div>
                        </motion.div>
                      </div>
                      <ReactMarkdown
                        components={{
                          h2: ({node, ...props}) => <h2 className="text-indigo-400 font-bold mt-6 mb-3 text-lg border-b border-slate-700/50 pb-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-indigo-300 font-semibold mt-4 mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="space-y-1 ml-4" {...props} />,
                          li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                          p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed" {...props} />,
                        }}
                      >
                        {analysis}
                      </ReactMarkdown>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex flex-col items-center justify-center h-full text-center py-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <AlertCircle className="h-10 w-10 text-indigo-400 mb-4" />
                      </motion.div>
                      <p className="text-white font-medium mb-2">No Analysis Yet</p>
                      <p className="text-sm text-slate-400 max-w-xs">
                        Upload a document or paste text, then click "Analyze" to generate a comprehensive ethics and bias report
                      </p>
                      <motion.div 
                        className="mt-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline" 
                          className="border-indigo-600 text-indigo-400 hover:bg-indigo-950"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload a Document
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full cursor-pointer group">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                  >
                    <BarChart4 className="h-5 w-5 text-indigo-400" />
                  </motion.div>
                  <h3 className="font-semibold text-white">Comprehensive Analysis</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Evaluates ethical concerns, bias detection, and impact across multiple dimensions
                </p>
                <motion.div 
                  className="mt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Link to="/features">
                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 p-0">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full cursor-pointer group">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                  >
                    <Lightbulb className="h-5 w-5 text-indigo-400" />
                  </motion.div>
                  <h3 className="font-semibold text-white">Actionable Insights</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Provides specific mitigation recommendations and policy suggestions
                </p>
                <motion.div 
                  className="mt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 p-0">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-900/60 border border-indigo-900/30 shadow-md overflow-hidden h-full cursor-pointer group">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                  >
                    <FileBarChart className="h-5 w-5 text-indigo-400" />
                  </motion.div>
                  <h3 className="font-semibold text-white">Sector-Specific</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Identifies risks unique to healthcare, finance, hiring, education, and more
                </p>
                <motion.div 
                  className="mt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 p-0">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
