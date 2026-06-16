export type Lang = 'it' | 'en' | 'fr';

export type HomeResponse = {
  language: string;
  brand: string;
  heading: string;
  content: string;
};

export type ContactLink = {
  name: string;
  description: string;
  url: string;
};

export type ContactResponse = {
  title: string;
  links: ContactLink[];
};