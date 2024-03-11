export interface SpotifyPaginationResponse {
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: SpotifyPlaybackItem[];
}

interface SpotifyPlaybackItem {
  track: SpotifyTrack;
  played_at: string;
  context: SpotifyPlaybackContext;
}

interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object; // Placeholder, adjust based on actual structure
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  followers?: {
    // Optional, based on provided JSON structure
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface SpotifyPlaybackContext {
  type: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
}

interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}
