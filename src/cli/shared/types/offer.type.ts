import { Amenity } from './amenity.type.js';
import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing.type.js';

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  city: string;
  previewImage: string;
  houseImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  rentalCost: number;
  amenities: Amenity[];
  author: string;
  commentCount: number;
  coordinates: Coordinates;
};
