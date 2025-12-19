/**
 * Represents the supported movie categories in the system
 * Each type can have its own pricing and promotion rules
 */
export enum MovieType {
  BackToTheFuture = 'BackToTheFuture',
  Other = 'Other',
}

/**
 * Domain representation of a Movie
 *
 * - `type` drives pricing and promotion logic
 * - `episode` is only relevant for saga-based movies
 */
export interface Movie {
  title: string;
  type: MovieType;
  episode: number | null;
}
