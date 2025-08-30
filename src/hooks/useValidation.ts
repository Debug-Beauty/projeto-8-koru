// src/hooks/useValidation.ts
import type { ResumeData, PersonalInfo, Experience } from "../types";

/** Tipos de erro usados pelo formulário */
export type PersonalErrors = Partial<Record<keyof PersonalInfo, string>>;
export type ExperienceField = keyof Experience;
export type ExperienceErrors = Record<string, Partial<Record<ExperienceField, string>>>;

/** Regex básicos */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

/** Util: parse dd/mm/aaaa para Date real (retorna null se inválida) */
export function parsePtBrDate(s: string): Date | null {
  const m = dateRegex.exec(s ?? "");
  if (!m) return null;
  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);
  const d = new Date(yyyy, mm - 1, dd);
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) return null;
  return d;
}

/** Telefone BR: aceita 10 ou 11 dígitos (DDD + 8/9) */
export function validatePhoneBR(raw: string): boolean {
  const digits = (raw || "").replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

/** Normaliza URL: adiciona https:// se o usuário não digitar o esquema */
function normalizeUrl(raw: string): string {
  const v = (raw || "").trim();
  if (!v) return v;
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(v)) return `https://${v}`;
  return v;
}

/** LinkedIn opcional; se houver, precisa ser linkedin.com (qualquer subdomínio) ou lnkd.in */
export function validateLinkedIn(url: string): boolean {
  if (!url) return true; // campo opcional
  try {
    const u = new URL(normalizeUrl(url));
    const host = u.hostname.toLowerCase();

    // aceita linkedin.com e subdomínios (www, br, pt, m, etc.), e o encurtador oficial lnkd.in
    const validHost =
      host === "linkedin.com" ||
      host.endsWith(".linkedin.com") ||
      host === "lnkd.in";

    return validHost;
  } catch {
    return false;
  }
}

/** Valida todo o ResumeData e retorna mapas de erros */
export function validateResume(data: ResumeData): {
  ok: boolean;
  personal: PersonalErrors;
  experiences: ExperienceErrors;
} {
  const personal: PersonalErrors = {};
  const experiences: ExperienceErrors = {};

  // ----- PersonalInfo -----
  const { name, email, phone, linkedin } = data.personalInfo;

  if (!name?.trim()) personal.name = "Informe seu nome.";
  if (!email?.trim()) personal.email = "Informe seu e-mail.";
  else if (!emailRegex.test(email)) personal.email = "E-mail inválido.";

  if (!phone?.trim()) personal.phone = "Informe seu telefone.";
  else if (!validatePhoneBR(phone)) personal.phone = "Telefone inválido (DDD + 8/9 dígitos).";

  if (linkedin && !validateLinkedIn(linkedin)) personal.linkedin = "URL do LinkedIn inválida.";

  // ----- Experiences -----
  for (const exp of data.experiences) {
    const errs: Partial<Record<ExperienceField, string>> = {};

    if (!exp.company?.trim()) errs.company = "Informe a empresa.";
    if (!exp.role?.trim()) errs.role = "Informe o cargo.";

    // startDate
    if (!exp.startDate?.trim()) {
      errs.startDate = "Informe a data inicial (dd/mm/aaaa).";
    } else if (!dateRegex.test(exp.startDate) || !parsePtBrDate(exp.startDate)) {
      errs.startDate = "Data inicial inválida.";
    }

    // endDate (pode ser vazio se isCurrent)
    if (!exp.isCurrent) {
      if (!exp.endDate?.trim()) {
        errs.endDate = "Informe a data final (ou marque 'Trabalho atual').";
      } else if (!dateRegex.test(exp.endDate) || !parsePtBrDate(exp.endDate)) {
        errs.endDate = "Data final inválida.";
      }
    } else if (exp.endDate?.trim()) {
      // se marcou atual, mas digitou algo, precisa ser válido também
      if (!dateRegex.test(exp.endDate) || !parsePtBrDate(exp.endDate)) {
        errs.endDate = "Data final inválida.";
      }
    }

    // start <= end (quando end existe)
    const dStart = parsePtBrDate(exp.startDate || "");
    const dEnd = exp.isCurrent ? null : parsePtBrDate(exp.endDate || "");
    if (dStart && dEnd && dStart > dEnd) {
      errs.endDate = "Data final deve ser posterior à data inicial.";
    }

    if (Object.keys(errs).length) experiences[exp.id] = errs;
  }

  const ok = !Object.keys(personal).length && !Object.keys(experiences).length;
  return { ok, personal, experiences };
}
