export interface Preference {
  category: string;
  children: PreferenceDescription[];
}

export interface PreferenceDescription {
  id: number;
  name: string;
}

export interface ResultMusic {
  id: number;
  name: string;
  category: string[];
  author: string;
  cover: string;
}
