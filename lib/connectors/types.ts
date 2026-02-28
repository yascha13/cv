export type ConnectorResult = {
  connector: string;
  recordsIngested: number;
  notes: string;
};

export interface SignalConnector {
  name: string;
  run(): Promise<ConnectorResult>;
}
