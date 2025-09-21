import React from 'react';
import { ResumeData } from '@/pages/ResumeBuilder';
import { ResumeTemplate } from './TemplateSelector';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, GraduationCap, Briefcase } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template?: ResumeTemplate;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template = 'modern' }) => {
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

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic':
        return {
          container: 'bg-white text-black font-serif',
          header: 'border-b-2 border-black pb-4 mb-8',
          name: 'text-3xl font-bold mb-2 text-black',
          contact: 'text-sm text-gray-700',
          section: 'mb-6',
          sectionTitle: 'text-xl font-bold mb-3 text-black border-b border-gray-300 pb-1',
          content: 'text-gray-800'
        };
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-orange-50 to-red-50 text-black',
          header: 'bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-t-lg mb-8',
          name: 'text-3xl font-bold mb-2',
          contact: 'text-sm text-orange-100',
          section: 'mb-6 px-6',
          sectionTitle: 'text-xl font-bold mb-3 text-orange-600 border-l-4 border-orange-500 pl-3',
          content: 'text-gray-800'
        };
      case 'minimal':
        return {
          container: 'bg-white text-gray-900',
          header: 'mb-12 text-center',
          name: 'text-4xl font-light mb-4 text-gray-900',
          contact: 'text-sm text-gray-600',
          section: 'mb-8',
          sectionTitle: 'text-lg font-light mb-4 text-gray-900 uppercase tracking-wide',
          content: 'text-gray-700'
        };
      case 'executive':
        return {
          container: 'bg-white text-black',
          header: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 mb-8',
          name: 'text-4xl font-bold mb-3',
          contact: 'text-sm text-emerald-100',
          section: 'mb-8 px-8',
          sectionTitle: 'text-2xl font-bold mb-4 text-emerald-600 border-b-2 border-emerald-500 pb-2',
          content: 'text-gray-800'
        };
      default: // modern
        return {
          container: 'bg-white text-black',
          header: 'mb-8 pb-6 border-b-2 border-primary/20',
          name: 'text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
          contact: 'text-sm text-gray-600',
          section: 'mb-6',
          sectionTitle: 'text-xl font-semibold mb-3 text-primary flex items-center',
          content: 'text-gray-800'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="h-full overflow-y-auto">
      <div className={`${styles.container} p-8 shadow-sm max-w-[21cm] mx-auto`} style={{ minHeight: '29.7cm' }}>
        {/* Header */}
        {hasContent('personalInfo') && (
          <header className={styles.header}>
            <h1 className={styles.name}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className={`flex flex-wrap gap-4 ${styles.contact}`}>
              {data.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-1" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {data.personalInfo.website}
                </div>
              )}
            </div>
          </header>
        )}

        {/* Professional Summary */}
        {hasContent('summary') && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Professional Summary
            </h2>
            <p className={`${styles.content} leading-relaxed`}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {hasContent('workExperience') && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Briefcase className="h-5 w-5 mr-2" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className={`font-semibold ${styles.content}`}>{exp.jobTitle}</h3>
                      <p className={styles.content}>{exp.company}</p>
                    </div>
                    <div className={`text-right text-sm ${styles.contact}`}>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </div>
                      {exp.location && (
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <div className={`${styles.content} text-sm mt-2 whitespace-pre-line`}>
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasContent('education') && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${styles.content}`}>{edu.degree}</h3>
                    <p className={styles.content}>{edu.institution}</p>
                    {edu.location && <p className={`text-sm ${styles.contact}`}>{edu.location}</p>}
                  </div>
                  <div className={`text-right text-sm ${styles.contact}`}>
                    {edu.graduationDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(edu.graduationDate)}
                      </div>
                    )}
                    {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasContent('skills') && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.skills.technical.length > 0 && (
                <div>
                  <h3 className={`font-medium ${styles.content} mb-2`}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.technical.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <h3 className={`font-medium ${styles.content} mb-2`}>Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.soft.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.languages.length > 0 && (
                <div>
                  <h3 className={`font-medium ${styles.content} mb-2`}>Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.languages.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
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