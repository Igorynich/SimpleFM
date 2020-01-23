import {Country} from './country';

export interface League {
  altNameEn: string;
  altNameRu: string;
  country?: Country | string;
  countryNameEn: string;
  countryNameRu: string;
  id?: string;
  nameEn: string;
  nameRu: string;
}
