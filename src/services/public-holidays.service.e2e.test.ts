import request from "supertest";
import { PublicHoliday } from "../types";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

describe("E2E tests", () => {
  describe("/api/v3/IsTodayPublicHoliday/{countryCode}", () => {
    it("should return 200 and today Public holiday status", async () => {
      const countryCode = "DE";
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/${countryCode}`
      );

      expect([200, 204]).toContain(status);
      expect(typeof body).toBe("object");

      if (status === 200) {
        expect(status).toBe(200);
      } else {
        expect(status).toBe(204);
      }
    });

    it("should return 404 if CountryCode is unknown", async () => {
      const countryCode = "AA";
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/${countryCode}`
      );

      expect(status).toBe(404);
    });
  });

  describe("/api/v3/NextPublicHolidays/{countryCode}", () => {
    it("should return 200 and the list of the next public holidays", async () => {
      const countryCode = "NL";
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/NextPublicHolidays/${countryCode}`
      );

      expect(status).toEqual(200);
      expect(Array.isArray(body)).toBe(true);

      (body as PublicHoliday[]).forEach((holiday) => {
        expect(holiday).toMatchObject({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
        });
      });
    });
  });
});

[
  {
    date: "2024-03-25",
    localName: "string",
    name: "string",
    countryCode: "string",
    fixed: true,
    global: true,
    counties: ["string"],
    launchYear: 0,
    types: ["Public"],
  },
];
