export interface Kpi {
    title: string;
    value: number;
    subtitle?: string;
    trendText?: string;
    trendType?: 'up' | 'down';
    accent?: 'blue' | 'green' | 'orange' | 'violet';
}