// Simple input sanitization to avoid injection/malicious prompts
export function sanitizeTopic(input: string): string {
  return input.replace(/[^\w\s.,!?-]/g, '').trim().slice(0, 100);
}
