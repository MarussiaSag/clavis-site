/** Простая серверная антиспам-проверка заявок с формы контактов. */

const MIN_FILL_MS = 2500;
const MAX_MESSAGE_LEN = 4000;

const SPAM_PATTERNS: RegExp[] = [
  /\$\s*[\d,.]{3,}/i,
  /earn\s+\$/i,
  /per\s+month/i,
  /telegra\.ph/i,
  /indexsubmit/i,
  /search-index/i,
  /google.?s?\s+search\s+index/i,
  /payment\s+available/i,
  /deposit\s+available/i,
  /confirm\s+your\s+transfer/i,
  /<\s*a\s+href/i,
  /https?:\/\/\S{8,}[\s\S]*https?:\/\//i,
  /go-na\.php/i,
  /fextemp\.com/i,
  /domains@search-/i,
];

function countUrls(text: string): number {
  return (text.match(/https?:\/\//gi) ?? []).length;
}

export type InquirySpamInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — должно быть пустым. */
  honeypot: string;
  /** Date.now() с момента рендера формы. */
  formTs: string;
};

export function isSpamInquiry(input: InquirySpamInput): boolean {
  if (input.honeypot.trim()) return true;

  const formTs = Number(input.formTs);
  if (!Number.isFinite(formTs) || formTs <= 0) return true;
  if (Date.now() - formTs < MIN_FILL_MS) return true;
  // Слишком старая форма (> 24ч) — скорее переиспользованный токен бота
  if (Date.now() - formTs > 24 * 60 * 60 * 1000) return true;

  if (input.message.length > MAX_MESSAGE_LEN) return true;
  if (countUrls(`${input.name} ${input.email} ${input.message}`) >= 2) return true;

  const blob = `${input.name}\n${input.email}\n${input.phone}\n${input.message}`;
  return SPAM_PATTERNS.some((pattern) => pattern.test(blob));
}
