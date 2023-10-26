import { format, subDays } from "date-fns";
import { newDateUTC } from "./DateUtils";

export function isObject(item: unknown) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const isObjectEmpty = (obj: Record<string | number, unknown>) =>
  Object.keys(obj).length === 0;

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
) {
  if (Array.isArray(target) && Array.isArray(source)) {
    const newTarget = [...target];
    for (const sourceKey in source) {
      const KeySource = sourceKey as unknown;
      const key = KeySource as number;
      if (typeof source[key as number] === "object") {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] ?? newTarget[key];
      }
    }
  } else if (isObject(target) && isObject(source)) {
    const newTarget = { ...target };
    for (const key in source) {
      if (isObject(source[key])) {
        // @ts-ignore
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] ?? newTarget[key];
      }
    }
    return newTarget;
  }
  return undefined;
}

/**
 * @template {{}} T
 * @param {T} obj
 * @param {string} desc
 */
export function objectAccessor(obj: Record<string, unknown>, desc: string) {
  const arr = desc ? desc?.split(".") : [];
  let result = obj;
  // @ts-ignore
  while (arr.length && (result = result?.[arr?.shift()]));
  return result;
}

export function objectToFormData(data: any) {
  const fd = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const arrData of data[key]) {
        fd.append(key, arrData);
      }
    } else {
      fd.set(key, data[key]);
    }
  }
  return fd;
}

/**
 * Get date range
 * @param startDate
 * @param endDate
 * @returns Array[Date]
 */
export function getDatesRange(startDate: Date, endDate: Date) {
  const currentDate = new Date(startDate.getTime());
  const dates = [];
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function daysOfWeeks(current: Date, limit = 6) {
  const week: Record<string, number> = {};
  const start = subDays(new Date(current), limit);

  getDatesRange(start, current).forEach((data) => {
    week[format(data, "yyyy-MM-dd")] = 0;
  });

  return week;
}

export const normalizeMetrics = (metrics: unknown): Record<any, any> => {
  const finalMetrics = {};
  const today = newDateUTC()
  for (const [metricKey, metricValue] of Object.entries(metrics)) {
    let channelsDate = [];
    let finalDateMetrics = { ...daysOfWeeks(today) };
    for (const [channelKey, channelValue] of Object.entries(
      metricValue.channels
    )) {
      channelsDate.push({ ...channelValue.dates });
    }
    channelsDate.forEach((date) => {
      for (let [dateKey, dateValue] of Object.entries(date)) {
        if (finalDateMetrics[dateKey]) {
          finalDateMetrics[dateKey] += dateValue;
        } else {
          finalDateMetrics[dateKey] = dateValue;
        }
      }
    });
    finalMetrics[metricKey] = finalDateMetrics;
  }
  return finalMetrics;
};

export const normalizeChannelDetailMetrics = (
  metrics: unknown
): Record<any, any> => {
  const finalMetrics = {};
  const todayFn = newDateUTC()
  for (const [metricKey, metricValue] of Object.entries(metrics)) {
    const finalDateMetrics = { ...daysOfWeeks(todayFn) };
    const metricDates = [metricValue?.dates];
    const finalDateWriteMetrics = new Array(24)
      .fill(0)
      .reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {});

    metricDates?.forEach((date) => {
      if (metricKey === "writes") {
        const today = format(todayFn, "yyyy-MM-dd");
        const todayWrite = date[today] || {};
        finalMetrics[metricKey] = Object.assign(
          finalDateWriteMetrics,
          todayWrite
        );
      } else {
        for (let [dateKey, dateValue] of Object.entries(date)) {
          if (finalDateMetrics[dateKey]) {
            finalDateMetrics[dateKey] += dateValue;
          } else {
            finalDateMetrics[dateKey] = dateValue;
          }
        }
        finalMetrics[metricKey] = finalDateMetrics;
      }
    });
  }
  return finalMetrics;
};
