export interface UnitCustomization {
  type: string;
  text: string[];
}

export interface UnitDetails {
  id: string;
  name: string;
  capacity: number;
  price: number;
  size: number;
  pictures: string[];
  customizations: UnitCustomization[];
}
