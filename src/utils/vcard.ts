/**
 * Utility for generating and downloading standard vCard (.vcf) contact files.
 * Compliant with vCard 3.0 specification for universal import into iOS Contacts,
 * Android, Google Contacts, and Microsoft Outlook.
 */

import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Generates RFC 2426 vCard 3.0 string representation of developer contact details.
 */
export function generateVCardString(): string {
  const parts = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Tripathi;Ayush;;;',
    `FN:${PERSONAL_INFO.name}`,
    `ORG:${PERSONAL_INFO.university}`,
    `TITLE:${PERSONAL_INFO.headline}`,
    `ROLE:${PERSONAL_INFO.role}`,
    `EMAIL;TYPE=INTERNET,PREF:${PERSONAL_INFO.email}`,
    `TEL;TYPE=CELL,VOICE,PREF:${PERSONAL_INFO.phone}`,
    `ADR;TYPE=HOME,PREF:;;Prayagraj;Uttar Pradesh;211001;India`,
    `LABEL;TYPE=HOME,PREF:${PERSONAL_INFO.location}`,
    `URL;TYPE=WORK:${PERSONAL_INFO.github}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${PERSONAL_INFO.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${PERSONAL_INFO.github}`,
    `NOTE:${PERSONAL_INFO.summary.replace(/[\r\n]+/g, ' ')}`,
    `REV:${new Date().toISOString()}`,
    'END:VCARD',
  ];

  return parts.join('\r\n');
}

/**
 * Triggers the browser download of the generated .vcf file.
 */
export function downloadVCard(filename = 'Ayush_Tripathi_Developer.vcf'): void {
  const vcardText = generateVCardString();
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  
  // Clean up DOM and revoke object URL
  document.body.removeChild(link);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
