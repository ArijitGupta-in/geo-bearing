# @arijitgupta/geo-bearing

[![npm version](https://img.shields.io/npm/v/@arijitgupta/geo-bearing)](https://www.npmjs.com/package/@arijitgupta/geo-bearing)
[![license](https://img.shields.io/npm/l/@arijitgupta/geo-bearing)](https://opensource.org/licenses/MIT)

A lightweight TypeScript utility for calculating the initial bearing between two
geographic coordinates along a great-circle path. Shared coordinate types,
conversion, validation, and angular utilities are provided by
[`@arijitgupta/geo-core`](https://www.npmjs.com/package/@arijitgupta/geo-core).

Accepts coordinates in **decimal degrees** or **Degrees, Minutes, Seconds (DMS)** format.

## Installation

```bash
npm install @arijitgupta/geo-bearing
```

## Usage

### Decimal degrees

```ts
import {
    bearingBetween,
    type Coordinate,
} from "@arijitgupta/geo-bearing";

const from: Coordinate = { latitude: 0, longitude: 0 };
const to: Coordinate = { latitude: 1, longitude: 0 };

const bearing = bearingBetween(from, to);
console.log(bearing); // 0 degrees: due north
```

The result is measured clockwise from true north and is normalized to the range `0 <= bearing < 360`.

### DMS coordinates

```ts
import {
    bearingBetween,
    type DMSCoordinate,
} from "@arijitgupta/geo-bearing";

const kolkata: DMSCoordinate = {
    latitude:  { degrees: 22, minutes: 34, seconds: 21.36, direction: "N" },
    longitude: { degrees: 88, minutes: 21, seconds: 50.04, direction: "E" },
};

const newDelhi: DMSCoordinate = {
    latitude:  { degrees: 28, minutes: 38, seconds: 12,   direction: "N" },
    longitude: { degrees: 77, minutes: 12, seconds: 36,   direction: "E" },
};

const bearing = bearingBetween(kolkata, newDelhi);
console.log(bearing); // initial bearing in degrees
```

Mixed formats are supported: `from` and `to` can each be either a decimal-degree or DMS coordinate.

### Converting DMS to decimal degrees

```ts
import {
    dmsToDecimal,
    type DMSCoordinate,
} from "@arijitgupta/geo-bearing";

const dms: DMSCoordinate = {
    latitude:  { degrees: 22, minutes: 34, seconds: 21.36, direction: "N" },
    longitude: { degrees: 88, minutes: 21, seconds: 50.04, direction: "E" },
};

const decimal = dmsToDecimal(dms);
// { latitude: 22.5726, longitude: 88.3639 }
```

## API

### `bearingBetween(from, to)`

Returns the initial bearing from one geographic coordinate to another in degrees.

| Parameter | Type | Description |
| --- | --- | --- |
| `from` | `Coordinate \| DMSCoordinate` | Starting coordinate |
| `to` | `Coordinate \| DMSCoordinate` | Destination coordinate |

**Returns:** `number` - initial bearing in degrees, measured clockwise from true north
and normalized to `0 <= bearing < 360`.

**Throws:** `RangeError` if the two coordinates are identical, a coordinate is out
of range, or DMS degrees/minutes are not integers.
**Throws:** `TypeError` if a coordinate field or DMS direction has an invalid type,
or if a decimal coordinate value is not finite.

### `dmsToDecimal(dms)`

Converts a `DMSCoordinate` to a decimal-degree coordinate object.

**Throws:** `RangeError` if any DMS component is out of range or degrees/minutes
are not integers.
**Throws:** `TypeError` if a DMS component has an invalid type or direction.

### `validateCoordinate(coordinate)`

Validates a decimal-degree coordinate.

**Throws:** `RangeError` if latitude is outside `[-90, 90]` or longitude is outside
`[-180, 180]`.
**Throws:** `TypeError` if the coordinate fields are invalid or either value is not finite.

### `Coordinate`

```ts
interface Coordinate {
    latitude: number;   // -90 to 90
    longitude: number;  // -180 to 180
}
```

### `DMSCoordinate`

```ts
interface DMSCoordinate {
    latitude:  LatitudeDMS;
    longitude: LongitudeDMS;
}

interface LatitudeDMS {
    degrees:   number;             // 0-90
    minutes:   number;             // 0-59
    seconds:   number;             // 0-<60
    direction: "N" | "S";
}

interface LongitudeDMS {
    degrees:   number;             // 0-180
    minutes:   number;             // 0-59
    seconds:   number;             // 0-<60
    direction: "E" | "W";
}
```

**Validation rules:**

- `minutes` must be in `[0, 60)`.
- `degrees` and `minutes` must be integers.
- `seconds` must be in `[0, 60)`.
- `latitude.degrees` must be in `[0, 90]`; the combined value must not exceed 90 degrees.
- `longitude.degrees` must be in `[0, 180]`; the combined value must not exceed 180 degrees.

## Upgrading from 1.x

Version 2.0.0 uses [`@arijitgupta/geo-core`](https://www.npmjs.com/package/@arijitgupta/geo-core)
for coordinate types, conversion, validation, and angle normalization. When upgrading:

- DMS degrees and minutes must be integers; fractional seconds remain supported.
- Invalid DMS directions and non-finite decimal coordinate values throw `TypeError`.
- Converting a south/west DMS coordinate whose magnitude is zero now returns positive zero.

## Behavior

- Uses spherical geometry to calculate the initial bearing, or forward azimuth, along
    the great-circle path between two points on Earth.
- Measures the result clockwise from true north.
- Normalizes results to the range `0 <= bearing < 360`.
- Accepts decimal-degree, DMS, and mixed coordinate formats.
- Throws a `RangeError` when the bearing is undefined because both coordinates are identical.
- Uses `@arijitgupta/geo-core` for shared geographic utilities.

## Development

```bash
npm install       # install dev dependencies
npm test          # run tests with Vitest
npm run check     # type-check without emitting output
npm run build     # compile TypeScript to dist/
```

## License

MIT
