import {
    DEGREES_PER_RADIAN,
    RADIANS_PER_DEGREE,
    coordinatesEqual,
    normalizeAngle,
    normalizeCoordinate,
} from "@arijitgupta/geo-core";
import type { Coordinate, DMSCoordinate } from "./types.js";

/**
 * Calculates the initial bearing from one geographic coordinate to another.
 *
 * Accepts coordinates in either decimal-degree ({@link Coordinate}) or
 * DMS ({@link DMSCoordinate}) format. Mixed formats are supported.
 *
 * The returned bearing is measured clockwise from true north and normalized
 * to the range 0°–<360°.
 *
 * Uses spherical geometry and returns the initial bearing (forward azimuth)
 * along the great-circle path between the coordinates.
 *
 * @param from - The starting coordinate.
 * @param to - The destination coordinate.
 * @returns The initial bearing from `from` to `to`, in degrees.
 *
 * @throws {RangeError} If a coordinate is out of range, or if the two
 * coordinates are the same point. Longitude -180 and 180 are the same
 * meridian, and two coordinates at the same pole are the same point whatever
 * their longitudes.
 * @throws {TypeError} If a coordinate is malformed or not finite.
 *
 * @example
 * ```ts
 * // Decimal degrees
 * const from: Coordinate = { latitude: 0, longitude: 0 };
 * const to: Coordinate = { latitude: 1, longitude: 0 };
 *
 * bearingBetween(from, to); // 0
 * ```
 */
export function bearingBetween(
    from: Coordinate | DMSCoordinate,
    to: Coordinate | DMSCoordinate
): number {
    const a = normalizeCoordinate(from);
    const b = normalizeCoordinate(to);

    if (coordinatesEqual(a, b)) {
        throw new RangeError("Bearing is undefined for identical coordinates.");
    }

    const fromLatitude = a.latitude * RADIANS_PER_DEGREE;
    const toLatitude = b.latitude * RADIANS_PER_DEGREE;

    const longitudeDifference =
        (b.longitude - a.longitude) * RADIANS_PER_DEGREE;

    const east = Math.sin(longitudeDifference) * Math.cos(toLatitude);

    const north =
        Math.cos(fromLatitude) * Math.sin(toLatitude) -
        Math.sin(fromLatitude) *
            Math.cos(toLatitude) *
            Math.cos(longitudeDifference);

    const angle = Math.atan2(east, north) * DEGREES_PER_RADIAN;

    return normalizeAngle(angle);
}
