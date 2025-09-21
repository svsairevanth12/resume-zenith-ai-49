import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const generateWithAI = async () => {
    // TODO: Implement Gemini AI integration for auto-complete
    console.log('AI generation requested');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-semibold gradient-text">
            Personal Information
          </h2>
          <p className="text-muted-foreground mt-1">
            Let's start with your basic contact information
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generateWithAI}
          className="ai-suggestion"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Assist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center text-sm font-medium">
            <User className="h-4 w-4 mr-2 text-primary" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center text-sm font-medium">
            <Mail className="h-4 w-4 mr-2 text-primary" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center text-sm font-medium">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            Phone Number
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            Location
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="New York, NY"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center text-sm font-medium">
            <Linkedin className="h-4 w-4 mr-2 text-primary" />
            LinkedIn Profile
          </Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center text-sm font-medium">
            <Globe className="h-4 w-4 mr-2 text-primary" />
            Website/Portfolio
          </Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>
      </div>

      <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Sparkles className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">💡 Pro Tip</p>
            <p className="text-sm text-muted-foreground">
              Make sure your email address sounds professional. Use your full name when possible, 
              and avoid nicknames or numbers that might look unprofessional to employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};