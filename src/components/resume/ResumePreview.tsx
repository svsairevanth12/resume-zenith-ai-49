import React from 'react';
import { ResumeData } from '@/pages/ResumeBuilder';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const hasContent = (section: keyof ResumeData): boolean => {
    switch (section) {
      case 'personalInfo':
        return !!(data.personalInfo.fullName || data.personalInfo.email);
      case 'summary':
        return !!data.summary.trim();
      case 'workExperience':
        return data.workExperience.length > 0;
      case 'education':
        return data.education.length > 0;
      case 'skills':
        return data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="h-full bg-white text-gray-900 overflow-y-auto">
      <div className="max-w-[8.5in] mx-auto p-8 bg-white min-h-full">
        {/* Header Section */}
        {hasContent('personalInfo') && (
          <header className="mb-6 pb-4 border-b-2 border-blue-600">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <span>{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </header>
        )}

        {/* Professional Summary */}
        {hasContent('summary') && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {hasContent('workExperience') && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((job) => (
                <div key={job.id} className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.jobTitle || 'Job Title'}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {job.company || 'Company Name'}
                        {job.location && ` • ${job.location}`}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center mt-1 sm:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(job.startDate)} - {job.isCurrentPosition ? 'Present' : formatDate(job.endDate)}
                    </div>
                  </div>
                  {job.description && (
                    <div className="text-gray-700 text-sm">
                      {job.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasContent('education') && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree || 'Degree'}
                      </h3>
                      <p className="text-gray-700">
                        {edu.institution || 'Institution'}
                        {edu.location && ` • ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    {edu.graduationDate && (
                      <div className="text-sm text-gray-600 flex items-center mt-1 sm:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(edu.graduationDate)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasContent('skills') && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.skills.languages.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.languages.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!hasContent('personalInfo') && !hasContent('summary') && !hasContent('workExperience') && !hasContent('education') && !hasContent('skills') && (
          <div className="flex items-center justify-center h-full min-h-[400px] text-center">
            <div>
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your Resume Preview</h3>
              <p className="text-gray-500">
                Start filling out the form on the left to see your resume come to life!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};