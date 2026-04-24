export interface Document {
  id: string;
  name: string;
  description: string;
  purpose: string;
  howToObtain: string;
  hasTemplate: boolean;
  templateUrl?: string;
  isExternal?: boolean;
}
