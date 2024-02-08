import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { HousingType, Offer, Amenity } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, publicationDate, city, previewImage, houseImages, isPremium, isFavorite, rating, housingType, roomCount, guestCount, rentalCost, amenities, author, commentCount, coordinates]) => ({
        name,
        description,
        publicationDate: new Date(publicationDate),
        city,
        previewImage,
        houseImages: houseImages ? houseImages.split(',') : [],
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number(rating),
        housingType: HousingType[housingType as 'apartment' | 'house' | 'room' | 'hotel'],
        roomCount: Number(roomCount),
        guestCount: Number.parseInt(guestCount, 10),
        rentalCost: Number.parseInt(rentalCost, 10),
        amenities: amenities ? amenities.split(',').map((a) => a as Amenity) : [],
        author,
        commentCount: Number(commentCount),
        coordinates:coordinates ? {
          latitude: Number(coordinates.split(',')[0].split(':')[1]),
          longitude: Number(coordinates.split(',')[1].split(':')[1]),
        } : { latitude: 0, longitude: 0 },
      })
      );
  }
}
