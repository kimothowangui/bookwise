/**
 * Read-Only Mode Protection
 * 
 * When ENABLE_READ_ONLY_MODE=true in production, this prevents ALL editing operations
 * This ensures your live site cannot be modified by anyone (including admins)
 */

export function isReadOnlyMode(): boolean {
  return process.env.ENABLE_READ_ONLY_MODE === 'true';
}

export function checkReadOnlyMode(): void {
  if (isReadOnlyMode()) {
    throw new Error('This site is in read-only mode. Editing is disabled.');
  }
}

export class ReadOnlyError extends Error {
  constructor() {
    super('This site is in read-only mode. All editing operations are disabled.');
    this.name = 'ReadOnlyError';
  }
}
