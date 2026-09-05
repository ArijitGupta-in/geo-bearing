import type { Coordinate, DMSCoordinate } from "./types.js";
import { dmsToDecimal, validateCoordinate } from "./coordinate.js";

function isDMSCoordinate(
    coord: Coordinate | DMSCoordinate
): coord is DMSCoordinate {
    return typeof coord.latitude === "object";
}

function normalize(coord: Coordinate | DMSCoordinate): Coordinate {
    if (isDMSCoordinate(coord)) {
        return dmsToDecimal(coord);
    }

    validateCoordinate(coord);
    return coord;
}

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
 * @throws {RangeError} If the two coordinates are identical.
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
    const a = normalize(from);
    const b = normalize(to);

    if (a.latitude === b.latitude && a.longitude === b.longitude) {
        throw new RangeError("Bearing is undefined for identical coordinates.");
    }

    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const toDegrees = (radians: number): number => radians * (180 / Math.PI);

    const fromLatitude = toRadians(a.latitude);
    const toLatitude = toRadians(b.latitude);

    const longitudeDifference = toRadians(b.longitude - a.longitude);

    const east = Math.sin(longitudeDifference) * Math.cos(toLatitude);

    const north =
        Math.cos(fromLatitude) * Math.sin(toLatitude) -
        Math.sin(fromLatitude) *
            Math.cos(toLatitude) *
            Math.cos(longitudeDifference);

    const angle = Math.atan2(east, north);

    return (toDegrees(angle) + 360) % 360;
}
