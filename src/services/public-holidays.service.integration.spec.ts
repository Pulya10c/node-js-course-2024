import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";

describe("public holidays service", () => {
  describe("public holidays service integration tests", () => {
    it("should fetch list of public holidays", async () => {
      const result = await getListOfPublicHolidays(2024, "DE");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should check if today is a public holiday", async () => {
      const result = await checkIfTodayIsPublicHoliday("NL");

      expect(typeof result).toBe("boolean");
    });

    it("should fetch next public holidays", async () => {
      const result = await getNextPublicHolidays("FR");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
