export interface Diagnostico {
  id: number;
  rule: string;
  reasons: string[];
  risks: string[];
  legalReferences: string[];
}
