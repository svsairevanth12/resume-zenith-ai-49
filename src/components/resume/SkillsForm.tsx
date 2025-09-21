import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Sparkles, Code, Users, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState({ technical: '', soft: '', languages: '' });
  const { toast } = useToast();

  const addSkill = (category: keyof Skills, skill: string) => {
    if (!skill.trim()) return;
    
    if (data[category].includes(skill.trim())) {
      toast({
        title: "Skill Already Added",
        description: "This skill is already in your list.",
        variant: "destructive",
      });
      return;
    }

    onChange({
      ...data,
      [category]: [...data[category], skill.trim()]
    });
    setNewSkill({ ...newSkill, [category]: '' });
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const generateSuggestions = (category: keyof Skills) => {
    const suggestions = {
      technical: ['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'SQL', 'Git', 'AWS', 'Docker', 'MongoDB'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'],
      languages: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese', 'Italian', 'Russian', 'Arabic']
    };

    const categorySkills = suggestions[category];
    const unusedSkills = categorySkills.filter(skill => !data[category].includes(skill));
    const randomSkills = unusedSkills.sort(() => 0.5 - Math.random()).slice(0, 3);

    onChange({
      ...data,
      [category]: [...data[category], ...randomSkills]
    });

    toast({
      title: "Skills Added!",
      description: `Added ${randomSkills.length} ${category} skills to your resume.`,
    });
  };

  const SkillCategory = ({ 
    title, 
    category, 
    icon: Icon, 
    placeholder, 
    description 
  }: { 
    title: string; 
    category: keyof Skills; 
    icon: any; 
    placeholder: string;
    description: string;
  }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateSuggestions(category)}
            className="ai-suggestion"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Suggest
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newSkill[category]}
            onChange={(e) => setNewSkill({ ...newSkill, [category]: e.target.value })}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(category, newSkill[category]);
              }
            }}
          />
          <Button 
            onClick={() => addSkill(category, newSkill[category])}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-lg bg-muted/20">
          {data[category].length === 0 ? (
            <p className="text-sm text-muted-foreground">No {category} skills added yet</p>
          ) : (
            data[category].map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center space-x-1 animate-scale-in"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(category, skill)}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-semibold gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground mt-1">
            Showcase your technical skills, soft skills, and language proficiency
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SkillCategory
          title="Technical Skills"
          category="technical"
          icon={Code}
          placeholder="e.g., React, Python, AWS"
          description="Programming languages, frameworks, tools, and technologies"
        />

        <SkillCategory
          title="Soft Skills"
          category="soft"
          icon={Users}
          placeholder="e.g., Leadership, Communication"
          description="Personal attributes and interpersonal abilities"
        />

        <SkillCategory
          title="Languages"
          category="languages"
          icon={Globe}
          placeholder="e.g., English, Spanish"
          description="Languages you can speak, read, or write"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Code className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">💡 Technical Skills Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Include skills mentioned in job descriptions</li>
                <li>• List your strongest skills first</li>
                <li>• Be specific (React vs just JavaScript)</li>
                <li>• Only include skills you can actually use</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ai-suggestion p-4 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">🤝 Soft Skills Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Choose skills relevant to the role</li>
                <li>• Avoid generic terms like "hardworking"</li>
                <li>• Focus on leadership and collaboration</li>
                <li>• Consider industry-specific soft skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};