import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Eye } from 'lucide-react';

export type ResumeTemplate = 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';

interface TemplateOption {
  id: ResumeTemplate;
  name: string;
  description: string;
  features: string[];
  color: string;
  preview: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business roles',
    features: ['ATS-Friendly', 'Color Accents', 'Modern Typography', 'Skills Highlight'],
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional, professional layout ideal for corporate positions',
    features: ['Conservative Design', 'Clean Layout', 'Professional Font', 'Formal Structure'],
    color: 'bg-gradient-to-br from-slate-600 to-slate-800',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Eye-catching design for creative and design professionals',
    features: ['Visual Appeal', 'Creative Layout', 'Brand Colors', 'Portfolio Section'],
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, distraction-free design that focuses on content',
    features: ['Ultra Clean', 'Typography Focus', 'White Space', 'Content First'],
    color: 'bg-gradient-to-br from-gray-400 to-gray-600',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'executive',
    name: 'Executive Premium',
    description: 'Premium design for senior leadership and C-suite positions',
    features: ['Premium Look', 'Leadership Focus', 'Achievement Highlights', 'Executive Summary'],
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    preview: '/api/placeholder/300/400'
  }
];

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-poppins font-semibold gradient-text mb-2">
          Choose Your Template
        </h2>
        <p className="text-muted-foreground">
          Select a resume template that matches your industry and career level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:ring-1 hover:ring-muted'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    {template.name}
                    {selectedTemplate === template.id && (
                      <Check className="h-5 w-5 text-primary ml-2" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Template Preview */}
              <div className={`w-full h-48 rounded-lg ${template.color} flex items-center justify-center text-white font-medium`}>
                <div className="text-center">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Template Preview</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Action Button */}
              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateChange(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="ai-suggestion p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Eye className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">📋 Template Tips</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Modern Professional:</strong> Best for tech, marketing, and business roles</li>
              <li>• <strong>Classic Executive:</strong> Perfect for traditional industries and senior positions</li>
              <li>• <strong>Creative Design:</strong> Ideal for designers, artists, and creative professionals</li>
              <li>• <strong>Minimal Clean:</strong> Great for any industry when content is priority</li>
              <li>• <strong>Executive Premium:</strong> Designed for C-suite and leadership positions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};