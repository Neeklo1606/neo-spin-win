import { Logger } from '@nestjs/common';

const mojibakeMarkers = ['Рџ', 'Р°', 'Рѕ', 'Сѓ', 'СЏ', 'С‹', 'Р‘', 'Р”', 'РЎ'];

function looksMojibake(value: string): boolean {
  if (!value) return false;
  return mojibakeMarkers.some((marker) => value.includes(marker));
}

function latin1ToUtf8(value: string): string {
  return Buffer.from(value, 'latin1').toString('utf8');
}

function isReadableCyrillic(value: string): boolean {
  return /[А-Яа-яЁё]/.test(value);
}

export function sanitizeUtf8String(
  value: string | null | undefined,
  fieldName: string,
  logger: Logger,
): string | null | undefined {
  if (value === null || value === undefined) return value;

  const normalized = value.trim().normalize('NFC');
  if (!normalized) return normalized;

  if (!looksMojibake(normalized)) {
    return normalized;
  }

  const repaired = latin1ToUtf8(normalized).trim().normalize('NFC');
  const repairedStillLooksBroken = looksMojibake(repaired);

  // Apply auto-fix only when corruption markers are gone and output looks readable.
  if (!repairedStillLooksBroken && isReadableCyrillic(repaired) && !repaired.includes('\uFFFD')) {
    logger.warn(`Possible encoding issue detected in "${fieldName}", auto-fixed before DB write`);
    return repaired;
  }

  logger.warn(
    `Possible encoding issue detected in "${fieldName}", auto-fix skipped due to low confidence`,
  );
  return normalized;
}
