import { Dayjs } from 'dayjs';

declare module 'dayjs-business-days' {
  interface BusinessDaysPlugin {
    businessDaysAdd(days: number): Dayjs;
    businessDaysSubtract(days: number): Dayjs;
    isBusinessDay(): boolean;
  }

  const plugin: (option: any, dayjsClass: any) => void;
  export default plugin;
}

// Extend dayjs
declare module 'dayjs' {
  interface Dayjs {
    businessDaysAdd(days: number): Dayjs;
    businessDaysSubtract(days: number): Dayjs;
    isBusinessDay(): boolean;
  }
} 