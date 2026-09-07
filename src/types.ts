export interface Advisor {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  specialty: string;
  experience: string;
  activeProjects: string[];
  scheduleUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  location: string;
  priceFromUF: number;
  priceFromUSD: number;
  status: 'Entrega Inmediata' | 'En Construcción' | 'Venta en Verde' | 'Preventa Exclusiva';
  coverImage: string;
  images: string[];
  description: string;
  amenities: string[];
  availableUnits: number;
  typologies: string[];
}

export interface Blueprint {
  id: string;
  title: string;
  model: string;
  surfaceTotal: number;
  surfaceInterior: number;
  surfaceTerrace: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  orientation: string;
  priceUF: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Interiores' | 'Exteriores' | 'Amenities' | 'Vistas Panorámicas';
  imageUrl: string;
  project: string;
}

export interface WebhookConfig {
  cpanelDomain: string;
  repoUrl: string;
  branch: string;
  secretToken: string;
  deploymentMethod: 'webhook-php' | 'github-actions' | 'cpanel-git';
  deployPath: string;
  ftpHost: string;
  ftpUser: string;
}

export interface DeploymentLog {
  id: string;
  timestamp: string;
  event: 'push' | 'ping' | 'build' | 'deploy' | 'sync';
  commit: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  details?: string;
}
