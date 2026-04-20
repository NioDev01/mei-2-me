import { JornadaChecklistItem } from '../types/jornada-checklist-item.type';

export function toggleChecklistItem(
  checklist: JornadaChecklistItem[],
  itemId: string,
): JornadaChecklistItem[] {
  const exists = checklist.some((item) => item.id === itemId);

  if (!exists) {
    throw new Error(`Checklist item não encontrado: ${itemId}`);
  }

  return checklist.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        isChecked: !item.isChecked,
      };
    }
    return item;
  });
}
