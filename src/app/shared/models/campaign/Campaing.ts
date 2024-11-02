export interface Campaign {
  id: number;
  name: string;
  discountPercentage: number;
  discountDesc: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
