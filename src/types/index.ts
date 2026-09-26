export interface DefinitionItem {
  scholar: string;
  year?: string;
  field: 'إدارة عامة' | 'إدارة موارد الأسرة' | 'منظمات دولية';
  quote: string;
  explanation: string;
  corePrinciple: string;
}

export interface ManagementElement {
  id: string;
  name: string;
  order: number;
  description: string;
  organizationalRole: string;
  familyRole: string;
  tools: string[];
}

export interface ManagementLevel {
  level: string;
  title: string;
  timeHorizon: string;
  focus: string;
  organizationExamples: string[];
  familyExamples: string[];
  requiredSkills: string;
}

export interface ManagementStyle {
  name: string;
  englishName: string;
  authorityLevel: string;
  characteristics: string[];
  pros: string[];
  cons: string[];
  familyContext: string;
}

export interface SchoolOfManagement {
  name: string;
  era: string;
  keyPioneers: string[];
  coreIdea: string;
  strengths: string;
  limitations: string;
  familyApplication: string;
}

export interface TimelineMilestone {
  era: string;
  period: string;
  title: string;
  description: string;
  keyContributions: string[];
  familyParallel: string;
}
