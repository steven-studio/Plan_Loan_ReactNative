import { NativeModules, Platform } from 'react-native';

const { CallLogModule } = NativeModules;

export type CallLogType =
  | 'incoming'
  | 'outgoing'
  | 'missed'
  | 'voicemail'
  | 'rejected'
  | 'blocked'
  | 'answeredExternally'
  | 'unknown';

export interface CallLogEntry {
  number: string | null;
  type: CallLogType;
  durationSeconds: number;
  timestamp: number;
  cachedName?: string | null;
  countryIso?: string | null;
  accountLabel?: string | null;
}

export interface CallLogOptions {
  limit?: number;
  since?: number;
}

type NativeCallLogModule = {
  getRecentCalls(options?: CallLogOptions): Promise<CallLogEntry[]>;
};

function assertModuleAvailable(): asserts CallLogModule is NativeCallLogModule {
  if (!CallLogModule) {
    throw new Error(
      Platform.select({
        android:
          'CallLogModule is unavailable. Ensure the native module is linked and the app has been rebuilt.',
        default: 'CallLogModule is only available on Android.',
      })
    );
  }
}

export async function getRecentCalls(
  options?: CallLogOptions
): Promise<CallLogEntry[]> {
  assertModuleAvailable();
  return CallLogModule.getRecentCalls(options);
}
