# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- DMS (Degrees, Minutes, Seconds) coordinate support:
  - `DMSCoordinate`, `LatitudeDMS`, `LongitudeDMS`, `LatitudeDirection`, and `LongitudeDirection` types.
  - `dmsToDecimal` - converts a `DMSCoordinate` to decimal degrees.
  - `bearingBetween` now accepts `DMSCoordinate` for either or both arguments; mixed formats are supported.
- `validateCoordinate` function for validating decimal-degree coordinates. Throws `RangeError` if latitude is outside `[-90, 90]` or longitude is outside `[-180, 180]`.

### Changed

- `bearingBetween` now validates decimal-degree inputs and throws `RangeError` for out-of-range or non-finite values, consistent with DMS validation.
- `bearingBetween` throws `RangeError` when the two coordinates are identical because the bearing is undefined.

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

[Unreleased]: https://github.com/ArijitGupta-in/geo-bearing/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ArijitGupta-in/geo-bearing/releases/tag/v1.0.0
