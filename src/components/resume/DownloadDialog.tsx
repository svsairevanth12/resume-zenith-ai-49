import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Loader2 } from 'lucide-react';
import { exportToPDF, exportToDocx } from '@/lib/exportUtils';
import { ResumeData } from '@/pages/ResumeBuilder';
import { useToast } from '@/hooks/use-toast';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
}

export const DownloadDialog: React.FC<DownloadDialogProps> = ({
  open,
  onOpenChange,
  resumeData,
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (!resumeData.personalInfo.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please add your full name before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(format);
    
    try {
      let result;
      if (format === 'pdf') {
        result = await exportToPDF(resumeData);
      } else {
        result = await exportToDocx(resumeData);
      }

      toast({
        title: "Download Successful",
        description: `Your resume has been downloaded as ${result.fileName}`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error(`${format.toUpperCase()} export failed:`, error);
      toast({
        title: "Download Failed",
        description: `Failed to export ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Download Resume
          </DialogTitle>
          <DialogDescription>
            Choose your preferred format to download your resume.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-4">
              <Button 
                onClick={() => handleDownload('pdf')}
                disabled={isDownloading !== null}
                className="w-full h-auto flex-col py-6 gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                {isDownloading === 'pdf' ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <FileText className="h-8 w-8" />
                )}
                <div className="text-center">
                  <div className="font-semibold text-lg">PDF Format</div>
                  <div className="text-sm opacity-90">
                    Perfect for job applications and ATS systems
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-4">
              <Button 
                onClick={() => handleDownload('docx')}
                disabled={isDownloading !== null}
                className="w-full h-auto flex-col py-6 gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isDownloading === 'docx' ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <FileText className="h-8 w-8" />
                )}
                <div className="text-center">
                  <div className="font-semibold text-lg">Word Document</div>
                  <div className="text-sm opacity-90">
                    Easy to edit and customize further
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Both formats are optimized for professional use and ATS compatibility
        </div>
      </DialogContent>
    </Dialog>
  );
};