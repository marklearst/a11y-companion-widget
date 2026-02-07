function normalizeMax(max: number): number {
  if (!Number.isFinite(max)) return 0;
  return Math.max(0, Math.floor(max));
}

export function capAvatarIds(avatarIds: string[], max: number): string[] {
  return avatarIds.slice(0, normalizeMax(max));
}

export function resolveAvatarStep(size: number, stackOffsetX: number): number {
  return Math.max(0, size + stackOffsetX);
}

export function resolveAvatarStackWidth(
  count: number,
  size: number,
  step: number
): number {
  const safeCount = Math.max(0, Math.floor(count));
  const safeSize = Math.max(0, size);
  const safeStep = Math.max(0, step);
  if (safeCount === 0) return 0;
  return safeSize + (safeCount - 1) * safeStep;
}

