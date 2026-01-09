
export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SGC_DESCARGABLE = 'SGC_DESCARGABLE',
  CAPACITACIONES = 'CAPACITACIONES',
  SGC_DINAMICO = 'SGC_DINAMICO'
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}

export interface DocumentInfo {
  id: string;
  name: string;
  category: string;
  lastUpdated: string;
}
