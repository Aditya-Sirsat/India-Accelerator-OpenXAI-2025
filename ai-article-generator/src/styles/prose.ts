export const proseClasses = "text-sm leading-relaxed";
export const proseParagraphClasses = "mb-2";

export function joinClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}


