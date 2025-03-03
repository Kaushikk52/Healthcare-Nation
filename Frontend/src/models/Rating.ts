export interface Rating {
    id: number;
    userId: number;
    medicalFacilityId: number;
    rating: number; // Ex: 4.5
    comment: string;
  }