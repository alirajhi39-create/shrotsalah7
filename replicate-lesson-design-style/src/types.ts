export type ClassSection = 'الثالث (أ)' | 'الثالث (ب)';

export interface StationMeta {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  pageRef?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  section: ClassSection;
  currentStation: number;
  completedStations: number[];
  stationScores: Record<number, number>;
  totalStars: number;
  startedAt: string;
  updatedAt: string;
}

export interface CityPrayerTime {
  city: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  midnight: string; // Calculated half-night: maghrib + (maghrib->fajr)/2
}
