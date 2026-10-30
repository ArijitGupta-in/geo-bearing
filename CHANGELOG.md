# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [2.0.1] - 2026-10-30

### Fixed

- `bearingBetween` now throws `RangeError` for coordinates that are the same point but were not compared equal:
  longitude `-180` versus `180`, and two coordinates at the same pole with different longitudes. Previously an
  arbitrary bearing was returned for them.

### Changed

- Coordinate handling uses `normalizeCoordinate` and `coordinatesEqual` from `@arijitgupta/geo-core`, so `null` and
  other malformed coordinates throw geo-core's specific `TypeError` messages, consistent with the other packages.
- The minimum `@arijitgupta/geo-core` version is now `1.1.0`, which provides `coordinatesEqual`.
- `npm run check` now also type-checks the tests.
- Source maps and declaration maps are no longer generated, because the published package does not include `src`.

### Added

- GitHub Actions CI on Node.js 22, 24, and 26: Markdown lint, type-check, tests with an 80% coverage threshold, and build.
- `test:coverage` and `lint:md` scripts, `tsconfig.test.json`, and `vitest.config.ts`.
- `publishConfig.access: "public"` in `package.json`.

### Internal

- The re-export tests were reduced to a smoke test; validation and conversion behavior is tested in geo-core.

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
