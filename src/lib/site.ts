/**
 * Site-wide constants & external endpoints.
 */

export const PHONE_NUMBER = "+962795441474";
export const PHONE_NUMBER_2 = "+962790654555";
export const PHONE_TEL = `tel:${PHONE_NUMBER}`;
export const PHONE_TEL_2 = `tel:${PHONE_NUMBER_2}`;
export const WHATSAPP_URL = `https://wa.me/962795441474`;

export const CONTACT_EMAIL = "info@evocrea.online";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** Recipient list for contact form submissions */
export const FORM_RECIPIENTS = [
  "info@evocrea.online",
  "mohammadswedan2003@gmail.com",
];

export function contactPath(locale: string): string {
  return `/${locale}/contact`;
}

export function showroomPath(locale: string): string {
  return `/${locale}/showroom`;
}
