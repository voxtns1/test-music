export interface Preference {
  category: string;
  children: PreferenceDescription[];
}

export interface PreferenceDescription {
  id: number;
  name: string;
}
