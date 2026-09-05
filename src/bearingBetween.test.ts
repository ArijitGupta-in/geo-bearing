import { describe, expect, it } from "vitest";
import { bearingBetween } from "./bearingBetween.js";

describe("bearingBetween", () => {
    describe("cardinal directions", () => {
        it("returns 0° when travelling north", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: 1, longitude: 0 }
                )
            ).toBeCloseTo(0);
        });

        it("returns 90° when travelling east", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: 0, longitude: 1 }
                )
            ).toBeCloseTo(90);
        });

        it("returns 180° when travelling south", () => {
            expect(
                bearingBetween(
                    { latitude: 1, longitude: 0 },
                    { latitude: 0, longitude: 0 }
                )
            ).toBeCloseTo(180);
        });

        it("returns 270° when travelling west", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 1 },
                    { latitude: 0, longitude: 0 }
                )
            ).toBeCloseTo(270);
        });
    });

    describe("intercardinal directions", () => {
        it("returns approximately 45° when travelling northeast", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: 1, longitude: 1 }
                )
            ).toBeCloseTo(45);
        });

        it("returns approximately 135° when travelling southeast", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: -1, longitude: 1 }
                )
            ).toBeCloseTo(135);
        });

        it("returns approximately 225° when travelling southwest", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: -1, longitude: -1 }
                )
            ).toBeCloseTo(225);
        });

        it("returns approximately 315° when travelling northwest", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 0 },
                    { latitude: 1, longitude: -1 }
                )
            ).toBeCloseTo(315);
        });
    });

    describe("edge cases", () => {
        it("handles crossing the antimeridian eastward", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: 179 },
                    { latitude: 0, longitude: -179 }
                )
            ).toBeCloseTo(90);
        });

        it("handles crossing the antimeridian westward", () => {
            expect(
                bearingBetween(
                    { latitude: 0, longitude: -179 },
                    { latitude: 0, longitude: 179 }
                )
            ).toBeCloseTo(270);
        });

        it("throws when coordinates are identical", () => {
            expect(() =>
                bearingBetween(
                    { latitude: 22.5726, longitude: 88.3639 },
                    { latitude: 22.5726, longitude: 88.3639 }
                )
            ).toThrow(RangeError);
        });
    });
});

describe("DMS coordinates", () => {
    it("supports DMS → DMS", () => {
        expect(
            bearingBetween(
                {
                    latitude: {
                        degrees: 0,
                        minutes: 0,
                        seconds: 0,
                        direction: "N",
                    },
                    longitude: {
                        degrees: 0,
                        minutes: 0,
                        seconds: 0,
                        direction: "E",
                    },
                },
                {
                    latitude: {
                        degrees: 1,
                        minutes: 0,
                        seconds: 0,
                        direction: "N",
                    },
                    longitude: {
                        degrees: 0,
                        minutes: 0,
                        seconds: 0,
                        direction: "E",
                    },
                }
            )
        ).toBeCloseTo(0);
    });

    it("supports mixed decimal and DMS coordinates", () => {
        expect(
            bearingBetween(
                { latitude: 0, longitude: 0 },
                {
                    latitude: {
                        degrees: 1,
                        minutes: 0,
                        seconds: 0,
                        direction: "N",
                    },
                    longitude: {
                        degrees: 0,
                        minutes: 0,
                        seconds: 0,
                        direction: "E",
                    },
                }
            )
        ).toBeCloseTo(0);
    });
});
