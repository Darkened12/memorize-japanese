export interface JapaneseLetter {
  letter: string;
  romanji: string;
  type: string;
}

export interface WeightedJapaneseLetter extends JapaneseLetter {
  weight: number;
}