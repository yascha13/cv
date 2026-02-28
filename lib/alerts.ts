export async function sendDailyDigestEmailMock(email: string, alerts: string[]) {
  return {
    ok: true,
    provider: 'mock-email-sender',
    recipient: email,
    alertCount: alerts.length
  };
}
