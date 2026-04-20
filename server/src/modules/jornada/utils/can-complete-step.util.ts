import { JornadaChecklistItem } from '../types/jornada-checklist-item.type';

export function canCompleteStep(checklist: JornadaChecklistItem[]): boolean {
  return checklist
    .filter((item) => item.required)
    .every((item) => item.isChecked);
}
