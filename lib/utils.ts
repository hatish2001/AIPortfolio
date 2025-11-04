import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getItemTitle(item: any): string {
  if ('title' in item) return item.title;
  if ('company' in item) return item.company;
  if ('institution' in item) return item.institution;
  return '';
}

export function getItemSubtitle(item: any): string {
  if ('role' in item && 'dateRange' in item) return `${item.role} • ${item.dateRange}`;
  if ('role' in item && 'period' in item) return `${item.role} • ${item.period}`;
  if ('degreeLevel' in item && 'program' in item) return `${item.degreeLevel} in ${item.program}`;
  if ('shortDescription' in item) return item.shortDescription;
  return '';
}
