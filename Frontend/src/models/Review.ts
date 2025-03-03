export interface Review {
    id: number;
    userId: number;
    medicalFacilityId: number;
    reviewText: string;
    createdAt: string; // ISO Date string
  }