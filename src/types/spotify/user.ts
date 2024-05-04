export interface MeResponse {
  displayName: string;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicitContent: ExplicitContent;
  email: string;
}

export interface ExplicitContent {
  filterEnabled: boolean;
  filterLocked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
