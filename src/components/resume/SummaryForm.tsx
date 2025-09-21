import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sparkles, FileText, Wand2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      // TODO: Implement Gemini AI integration
      // For now, we'll use a sample generated summary
      const aiGeneratedSummary = `Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about creating efficient, user-centric solutions that drive business growth and enhance user experience.`;
      
      onChange(aiGeneratedSummary);
      toast({
        title: "AI Summary Generated!",
        description: "Your professional summary has been created. Feel free to customize it further.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const improveSummary = async () => {
    if (!data.trim()) {
      toast({
        title: "No Content to Improve",
        description: "Please write or generate a summary first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Implement AI improvement
      const improved = data + " Additionally, I excel at problem-solving and have a strong background in agile methodologies and continuous integration practices.";
      onChange(improved);
      toast({
        title: "Summary Improved!",
        description: "Your summary has been enhanced with AI suggestions.",
      });
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: "Unable to improve summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-semibold gradient-text">
            Professional Summary
          </h2>
          <p className="text-muted-foreground mt-1">
            A compelling summary that highlights your key achievements and skills
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={improveSummary}
            disabled={isGenerating || !data.trim()}
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Improve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSummary}
            disabled={isGenerating}
            className="ai-suggestion"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'AI Generate'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary" className="flex items-center text-sm font-medium">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Professional Summary
          </Label>
          <Textarea
            id="summary"
            value={data}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a compelling professional summary that highlights your key skills, experience, and career achievements. This should be 3-4 sentences that capture what makes you unique as a professional."
            className="min-h-[120px] transition-all duration-200 focus:scale-[1.01]"
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Character count: {data.length}/500</span>
            <span>{data.trim() ? '✓ Summary added' : '⚠ Summary required'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">🎯 Writing Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with your years of experience</li>
                <li>• Mention 2-3 key skills or specializations</li>
                <li>• Include a notable achievement</li>
                <li>• End with your career goals or value proposition</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ai-suggestion p-4 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">📝 Best Practices</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep it concise (3-4 sentences)</li>
                <li>• Use action words and quantify achievements</li>
                <li>• Tailor to your target role</li>
                <li>• Avoid first-person pronouns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};