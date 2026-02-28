import { OrganizationRecord, SignalRecord } from './types';

const signalWeights: Record<string, number> = {
  SEC_FORM_D: 28,
  IRS_990_POSTED: 14,
  BUSINESS_REGISTRY_UPDATE: 10,
  OWNERSHIP_CHANGE: 22,
  EXECUTIVE_TRANSITION: 20,
  SUCCESSION_INDICATOR: 24
};

export function computeLeadScore(org: OrganizationRecord, signals: SignalRecord[], advisorState?: string) {
  let score = 0;
  const breakdown: { label: string; points: number }[] = [];

  const orgSignals = signals.filter((s) => s.organizationId === org.id);
  orgSignals.forEach((signal) => {
    const points = (signalWeights[signal.type] ?? 0) * signal.confidenceScore;
    score += points;
    breakdown.push({ label: `${signal.type} (${signal.source})`, points: Number(points.toFixed(1)) });
  });

  if (org.registrationYear && new Date().getFullYear() - org.registrationYear > 20) {
    score += 12;
    breakdown.push({ label: 'Long operating history', points: 12 });
  }

  if (org.founderLed && org.privateCompany) {
    score += 18;
    breakdown.push({ label: 'Founder-led private company', points: 18 });
  }

  if (advisorState && advisorState === org.state) {
    score += 10;
    breakdown.push({ label: 'Geographic fit', points: 10 });
  }

  return {
    score: Math.min(100, Math.round(score)),
    breakdown
  };
}
