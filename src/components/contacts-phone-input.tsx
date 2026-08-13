"use client";

import { useState } from "react";

const PHONE_PREFIX = "+7 ";
const EMPTY_MASK = "+7 (___) ___-__-__";

function extractNationalDigits(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 10);
}

function formatPhoneDigits(digits: string): string {
  if (!digits) return PHONE_PREFIX;

  let result = `${PHONE_PREFIX}(`;

  result += digits.slice(0, 3);
  if (digits.length < 3) return result;

  result += `) ${digits.slice(3, 6)}`;
  if (digits.length < 6) return result;

  result += `-${digits.slice(6, 8)}`;
  if (digits.length < 8) return result;

  result += `-${digits.slice(8, 10)}`;
  return result;
}

type ContactsPhoneInputProps = {
  className: string;
};

export function ContactsPhoneInput({ className }: ContactsPhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [hiddenValue, setHiddenValue] = useState("");

  const updatePhone = (raw: string) => {
    const digits = extractNationalDigits(raw);
    setDisplayValue(formatPhoneDigits(digits));
    setHiddenValue(digits.length === 10 ? `+7${digits}` : "");
  };

  return (
    <>
      <input type="hidden" name="phone" value={hiddenValue} />
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder={EMPTY_MASK}
        value={displayValue}
        onChange={(event) => updatePhone(event.target.value)}
        onFocus={() => {
          if (!displayValue) setDisplayValue(PHONE_PREFIX);
        }}
        onBlur={() => {
          if (displayValue === PHONE_PREFIX) {
            setDisplayValue("");
          }
        }}
        className={className}
      />
    </>
  );
}
