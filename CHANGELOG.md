# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-10-30

### Breaking changes

- DMS degrees and minutes must be integers; values with fractional degrees or
  minutes that were accepted by 1.x are rejected. Fractional seconds remain valid.
- Invalid DMS directions now throw `TypeError`.
- Non-finite decimal coordinate values now throw `TypeError` instead of `RangeError`.
- DMS values representing zero now convert to positive zero, including south/west zero.

### Changed

- Use `@arijitgupta/geo-core` v1.0.0 for shared coordinate types, conversion,
  validation, and angle normalization.
- `bearingBetween` validates decimal-degree inputs and throws `RangeError` for
  out-of-range values.
- `bearingBetween` throws `RangeError` when the two coordinates are identical
  because the bearing is undefined.

### Added

- DMS (Degrees, Minutes, Seconds) coordinate support:
  - `DMSCoordinate`, `LatitudeDMS`, `LongitudeDMS`, `LatitudeDirection`, and `LongitudeDirection` types.
  - `dmsToDecimal` - converts a `DMSCoordinate` to decimal degrees.
  - `bearingBetween` now accepts `DMSCoordinate` for either or both arguments; mixed formats are supported.
- `validateCoordinate` function for validating decimal-degree coordinates. Throws `RangeError` if latitude is outside `[-90, 90]` or longitude is outside `[-180, 180]`.

### Internal

- All types and interfaces are consolidated in `src/types.ts`.
- All coordinate logic, including validation and DMS conversion, is contained in `src/coordinate.ts`.

---

## [1.0.0] - 2026-09-05

### Added

- `bearingBetween(from, to)` - calculates the initial bearing between two geographic coordinates in degrees using spherical geometry.
- Bearings are measured clockwise from true north and normalized to the range `0 <= bearing < 360`.
- `Coordinate` interface with decimal-degree latitude and longitude values.
- ESM-only package with full TypeScript declarations.
- `exports` field in `package.json` for package resolution.
- `prepublishOnly` script to type-check, test, and build before publishing.

[1.0.0]: https://github.com/ArijitGupta-in/geo-bearing/releases/tag/v1.0.0
[2.0.0]: https://github.com/ArijitGupta-in/geo-bearing/releases/tag/v2.0.0
