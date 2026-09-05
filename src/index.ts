/**
 * @arijitgupta/geo-bearing — public API surface.
 *
 * Exports the {@link bearingBetween} function and coordinate types.
 */
export type {
    Coordinate,
    DMSCoordinate,
    LatitudeDMS,
    LongitudeDMS,
    LatitudeDirection,
    LongitudeDirection,
} from "./types.js";

export { bearingBetween } from "./bearingBetween.js";

export { dmsToDecimal, validateCoordinate } from "./coordinate.js";
