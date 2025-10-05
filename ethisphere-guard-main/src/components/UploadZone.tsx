import { useState, useCallback } from "react";
import { Upload, File, X, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  onAnalyze: (content: string) => void;
  isAnalyzing: boolean;
}

export const UploadZone = ({ onAnalyze, isAnalyzing }: UploadZoneProps) => {
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: globalThis.File) => {
    const validTypes = [
      'text/plain',
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|csv|xlsx?|docx?)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, CSV, Excel, Word, or text file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 20MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    
    if (activeTab === "upload" && selectedFile) {
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onAnalyze(content);
      };
      reader.readAsText(selectedFile);
    } else if (activeTab === "paste" && pastedText.trim()) {
      onAnalyze(pastedText);
    } else {
      toast({
        title: "No Content",
        description: "Please upload a file or paste text to analyze.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-8 border-2 border-primary/20 bg-card/50 backdrop-blur">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 gradient-text">Analyze Content</h2>
          <p className="text-muted-foreground">
            Upload a document or paste text for AI-powered ethics and bias analysis
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="paste">
              <FileText className="mr-2 h-4 w-4" />
              Paste Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
                ${isDragging 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }
                ${selectedFile ? 'bg-primary/5' : ''}
              `}
            >
              {!selectedFile ? (
                <>
                  <Upload className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                  <p className="text-lg font-medium mb-2">Drop your file here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: PDF, CSV, XLSX, TXT, DOCX (max 20MB)
                  </p>
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept=".pdf,.csv,.xlsx,.txt,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Choose File
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-3 bg-background/50 rounded-lg px-4 py-3">
                    <File className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="paste" className="mt-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your text content here for analysis..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="min-h-[300px] resize-none bg-background/50"
              />
              {pastedText && (
                <p className="text-sm text-muted-foreground">
                  {pastedText.length} characters
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={handleAnalyze}
          disabled={(activeTab === "upload" && !selectedFile) || (activeTab === "paste" && !pastedText.trim()) || isAnalyzing}
          className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <div className="pulse-ring mr-2 h-5 w-5 rounded-full border-2 border-current" />
              Analyzing Ethics & Bias...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze Ethics & Bias
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
