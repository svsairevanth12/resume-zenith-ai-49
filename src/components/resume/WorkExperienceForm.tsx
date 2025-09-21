import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Sparkles, Briefcase, MapPin, Calendar, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentPosition: boolean;
  description: string;
}

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, onChange }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { toast } = useToast();

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentPosition: false,
      description: '',
    };
    onChange([...data, newExperience]);
    setExpandedCard(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
    if (expandedCard === id) {
      setExpandedCard(null);
    }
  };

  const generateDescription = async (experience: WorkExperience) => {
    if (!experience.jobTitle || !experience.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in job title and company first.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement Gemini AI integration
    const aiDescription = `• Led development of key features and improvements resulting in 25% increase in user engagement
• Collaborated with cross-functional teams to deliver high-quality software solutions on time and within budget
• Implemented best practices for code quality, testing, and deployment processes
• Mentored junior developers and contributed to team knowledge sharing initiatives`;

    updateExperience(experience.id, 'description', aiDescription);
    toast({
      title: "Description Generated!",
      description: "AI has created a professional job description for you.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-semibold gradient-text">
            Work Experience
          </h2>
          <p className="text-muted-foreground mt-1">
            Add your professional work history with detailed accomplishments
          </p>
        </div>
        <Button
          onClick={addExperience}
          className="btn-hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No work experience added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Start building your professional history</p>
          <Button onClick={addExperience} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <Card 
              key={experience.id}
              className={`transition-all duration-300 ${
                expandedCard === experience.id ? 'ring-2 ring-primary/20 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {experience.jobTitle || `Job ${index + 1}`}
                      </CardTitle>
                      {experience.company && (
                        <p className="text-sm text-muted-foreground">{experience.company}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedCard(
                        expandedCard === experience.id ? null : experience.id
                      )}
                    >
                      {expandedCard === experience.id ? 'Collapse' : 'Edit'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(experience.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedCard === experience.id && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Briefcase className="h-4 w-4 mr-2 text-primary" />
                        Job Title *
                      </Label>
                      <Input
                        value={experience.jobTitle}
                        onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Briefcase className="h-4 w-4 mr-2 text-primary" />
                        Company *
                      </Label>
                      <Input
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                        placeholder="Tech Company Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        Location
                      </Label>
                      <Input
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                        placeholder="New York, NY"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Start Date *
                      </Label>
                      <Input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        End Date
                      </Label>
                      <Input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                        disabled={experience.isCurrentPosition}
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        id={`current-${experience.id}`}
                        checked={experience.isCurrentPosition}
                        onCheckedChange={(checked) => {
                          updateExperience(experience.id, 'isCurrentPosition', !!checked);
                          if (checked) {
                            updateExperience(experience.id, 'endDate', '');
                          }
                        }}
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">
                        I currently work here
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Job Description & Achievements</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateDescription(experience)}
                        className="ai-suggestion"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Generate
                      </Button>
                    </div>
                    <Textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                      placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Quantify your impact with numbers when possible&#10;• Focus on results and outcomes"
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Sparkles className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">💼 Experience Tips</p>
            <p className="text-sm text-muted-foreground">
              Focus on achievements rather than duties. Use action verbs and quantify your impact with 
              specific numbers (e.g., "Increased sales by 25%" instead of "Responsible for sales").
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};