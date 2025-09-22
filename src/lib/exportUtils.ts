import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/pages/ResumeBuilder';

export const exportToPDF = async (resumeData: ResumeData, elementId: string = 'resume-preview') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
    pdf.save(fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to export PDF');
  }
};

export const exportToDocx = async (resumeData: ResumeData) => {
  try {
    // Create HTML content for Word document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; }
          .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .contact { font-size: 14px; margin-bottom: 5px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 15px; padding-bottom: 5px; }
          .job-title { font-weight: bold; font-size: 16px; }
          .company { font-style: italic; margin-bottom: 5px; }
          .date { font-size: 14px; color: #666; margin-bottom: 10px; }
          .description { margin-bottom: 15px; }
          .skills-category { font-weight: bold; display: inline; }
          ul { margin: 0; padding-left: 20px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName}</div>
          <div class="contact">${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}</div>
          <div class="contact">${resumeData.personalInfo.location}</div>
          ${resumeData.personalInfo.linkedin || resumeData.personalInfo.website ? 
            `<div class="contact">${[resumeData.personalInfo.linkedin, resumeData.personalInfo.website].filter(Boolean).join(' | ')}</div>` 
            : ''}
        </div>

        ${resumeData.summary ? `
          <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>${resumeData.summary}</p>
          </div>
        ` : ''}

        ${resumeData.workExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">WORK EXPERIENCE</div>
            ${resumeData.workExperience.map(exp => `
              <div style="margin-bottom: 20px;">
                <div class="job-title">${exp.jobTitle}</div>
                <div class="company">${exp.company} | ${exp.location}</div>
                <div class="date">${exp.startDate} - ${exp.isCurrentPosition ? 'Present' : exp.endDate}</div>
                <div class="description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
          <div class="section">
            <div class="section-title">EDUCATION</div>
            ${resumeData.education.map(edu => `
              <div style="margin-bottom: 15px;">
                <div class="job-title">${edu.degree}</div>
                <div class="company">${edu.institution} | ${edu.location}</div>
                <div class="date">Graduated: ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.languages.length > 0 ? `
          <div class="section">
            <div class="section-title">SKILLS</div>
            ${resumeData.skills.technical.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <span class="skills-category">Technical Skills:</span> ${resumeData.skills.technical.join(', ')}
              </div>
            ` : ''}
            ${resumeData.skills.soft.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <span class="skills-category">Soft Skills:</span> ${resumeData.skills.soft.join(', ')}
              </div>
            ` : ''}
            ${resumeData.skills.languages.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <span class="skills-category">Languages:</span> ${resumeData.skills.languages.join(', ')}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </body>
      </html>
    `;

    // Create blob with proper MIME type for Word document
    const blob = new Blob([htmlContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.doc`;
    saveAs(blob, fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('DOC export failed:', error);
    throw new Error('Failed to export DOC');
  }
};