import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { WorkExperienceForm } from '@/components/resume/WorkExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { SummaryForm } from '@/components/resume/SummaryForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Download, Sparkles, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  workExperience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentPosition: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
  });

  const [activeTab, setActiveTab] = useState('personal');

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download.",
    });
  };

  const getTabIcon = (tab: string) => {
    const icons = {
      personal: '👤',
      summary: '📝',
      experience: '💼',
      education: '🎓',
      skills: '⚡',
    };
    return icons[tab as keyof typeof icons] || '📄';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-poppins font-bold gradient-text">
                  AI Resume Builder
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleSave}
                className="hidden sm:flex"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                onClick={handleDownload}
                className="btn-hero"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="form-section">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="personal" className="text-xs sm:text-sm">
                    <span className="mr-1">{getTabIcon('personal')}</span>
                    <span className="hidden sm:inline">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="text-xs sm:text-sm">
                    <span className="mr-1">{getTabIcon('summary')}</span>
                    <span className="hidden sm:inline">Summary</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs sm:text-sm">
                    <span className="mr-1">{getTabIcon('experience')}</span>
                    <span className="hidden sm:inline">Experience</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="text-xs sm:text-sm">
                    <span className="mr-1">{getTabIcon('education')}</span>
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs sm:text-sm">
                    <span className="mr-1">{getTabIcon('skills')}</span>
                    <span className="hidden sm:inline">Skills</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={(data) => updateResumeData('personalInfo', data)}
                  />
                </TabsContent>

                <TabsContent value="summary">
                  <SummaryForm
                    data={resumeData.summary}
                    onChange={(data) => updateResumeData('summary', data)}
                  />
                </TabsContent>

                <TabsContent value="experience">
                  <WorkExperienceForm
                    data={resumeData.workExperience}
                    onChange={(data) => updateResumeData('workExperience', data)}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => updateResumeData('education', data)}
                  />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => updateResumeData('skills', data)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
            <Card className="resume-preview h-full">
              <CardContent className="p-0 h-full">
                <ResumePreview data={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;