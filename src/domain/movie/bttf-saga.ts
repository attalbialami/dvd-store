import { normalizeTitle } from './input-normalizer';
import { Movie, MovieType } from './movie';

const VALID_EPISODES = new Set([1, 2, 3]);

/**
 * Extracts the episode number from a Back to the Future title
 *
 * @example
 * "Back to the Future 2" → 2
 *
 * Returns `null` if:
 * - the title does not match the saga
 * - the episode is not supported
 */
export function extractEpisode(title: string): number | null {
  const normalized = normalizeTitle(title);
  const match = normalized.match(/^back to the future\s+(\d+)$/);
  if (!match) return null;
  const episode = Number(match[1]);
  return VALID_EPISODES.has(episode) ? episode : null;
}

/**
 * Converts a raw input string into a domain `Movie`
 *
 * This function encapsulates all parsing and classification logic
 * for Back to the Future movies
 */
export function toMovie(rawTitle: string): Movie {
  const episode = extractEpisode(rawTitle);
  if (episode !== null) {
    return { title: rawTitle, type: MovieType.BackToTheFuture, episode };
  }
  return { title: rawTitle, type: MovieType.Other, episode: null };
}
