import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
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
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header with name
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.fullName,
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),

          // Contact information
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.personalInfo.location}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          // LinkedIn and Website
          ...(resumeData.personalInfo.linkedin || resumeData.personalInfo.website ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: [resumeData.personalInfo.linkedin, resumeData.personalInfo.website]
                    .filter(Boolean)
                    .join(' | '),
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ] : []),

          // Summary Section
          ...(resumeData.summary ? [
            new Paragraph({
              children: [new TextRun({ text: '', size: 20 })],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL SUMMARY',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.summary,
                  size: 20,
                }),
              ],
            }),
          ] : []),

          // Work Experience Section
          ...(resumeData.workExperience.length > 0 ? [
            new Paragraph({
              children: [new TextRun({ text: '', size: 20 })],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'WORK EXPERIENCE',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
            }),
            ...resumeData.workExperience.flatMap((exp) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.jobTitle,
                    bold: true,
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.company} | ${exp.location}`,
                    italics: true,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.startDate} - ${exp.isCurrentPosition ? 'Present' : exp.endDate}`,
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.description,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [new TextRun({ text: '', size: 12 })],
              }),
            ]),
          ] : []),

          // Education Section
          ...(resumeData.education.length > 0 ? [
            new Paragraph({
              children: [new TextRun({ text: '', size: 20 })],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EDUCATION',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
            }),
            ...resumeData.education.flatMap((edu) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.degree,
                    bold: true,
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.institution} | ${edu.location}`,
                    italics: true,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Graduated: ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                children: [new TextRun({ text: '', size: 12 })],
              }),
            ]),
          ] : []),

          // Skills Section
          ...(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.languages.length > 0 ? [
            new Paragraph({
              children: [new TextRun({ text: '', size: 20 })],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SKILLS',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
            }),
            ...(resumeData.skills.technical.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Technical Skills: ',
                    bold: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: resumeData.skills.technical.join(', '),
                    size: 20,
                  }),
                ],
              }),
            ] : []),
            ...(resumeData.skills.soft.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Soft Skills: ',
                    bold: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: resumeData.skills.soft.join(', '),
                    size: 20,
                  }),
                ],
              }),
            ] : []),
            ...(resumeData.skills.languages.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Languages: ',
                    bold: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: resumeData.skills.languages.join(', '),
                    size: 20,
                  }),
                ],
              }),
            ] : []),
          ] : []),
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.docx`;
    
    saveAs(new Blob([buffer]), fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('DOCX export failed:', error);
    throw new Error('Failed to export DOCX');
  }
};