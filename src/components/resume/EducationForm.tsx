import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GraduationCap, Building, MapPin, Calendar } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
    setExpandedCard(newEducation.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
    if (expandedCard === id) {
      setExpandedCard(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-semibold gradient-text">
            Education
          </h2>
          <p className="text-muted-foreground mt-1">
            Add your educational background and qualifications
          </p>
        </div>
        <Button
          onClick={addEducation}
          className="btn-hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No education added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Add your academic achievements</p>
          <Button onClick={addEducation} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <Card 
              key={education.id}
              className={`transition-all duration-300 ${
                expandedCard === education.id ? 'ring-2 ring-primary/20 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {education.degree || `Education ${index + 1}`}
                      </CardTitle>
                      {education.institution && (
                        <p className="text-sm text-muted-foreground">{education.institution}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedCard(
                        expandedCard === education.id ? null : education.id
                      )}
                    >
                      {expandedCard === education.id ? 'Collapse' : 'Edit'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(education.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedCard === education.id && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                        Degree *
                      </Label>
                      <Input
                        value={education.degree}
                        onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Building className="h-4 w-4 mr-2 text-primary" />
                        Institution *
                      </Label>
                      <Input
                        value={education.institution}
                        onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                        placeholder="University of Technology"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        Location
                      </Label>
                      <Input
                        value={education.location}
                        onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                        placeholder="Boston, MA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Graduation Date
                      </Label>
                      <Input
                        type="month"
                        value={education.graduationDate}
                        onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        GPA (Optional)
                      </Label>
                      <Input
                        value={education.gpa || ''}
                        onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                      />
                      <p className="text-xs text-muted-foreground">Only include if 3.5 or above</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <GraduationCap className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">🎓 Education Tips</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• List education in reverse chronological order (most recent first)</li>
              <li>• Include relevant coursework, honors, or activities if space allows</li>
              <li>• Only include GPA if it's 3.5 or higher</li>
              <li>• For recent graduates, education can go before experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};