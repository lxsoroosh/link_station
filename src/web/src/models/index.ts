export interface StationItem {
    x: string;
    y: string;
    reach: string;
    id: number;
}

export type StationResponse = {
    station?: {
        x: number;
        y: number;
        reach: number;
        id: number;
    };
    power?: number;
    message?: string;
};