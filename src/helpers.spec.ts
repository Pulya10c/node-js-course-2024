import { validateInput, shortenPublicHoliday } from "./helpers";

describe("Input Validation", () => {
  it("validate input", () => {
    expect(
      validateInput({ year: new Date().getFullYear(), country: "NL" })
    ).toBeTruthy();

    expect(() =>
      validateInput({
        year: new Date().getFullYear(),
        country: "unsupportedCountry",
      })
    ).toThrow(Error);

    expect(() => validateInput({ year: 1990, country: "USA" })).toThrow(Error);
    expect(() => validateInput({ year: 199, country: "FR" })).toThrow(Error);
  });
});

describe("PublicHoliday transformation", () => {
  it("reduction of information about holidays", () => {
    const holiday = {
      name: "Christmas Day",
      localName: "Natale",
      date: "2022-12-25",
      countryCode: "IT",
      fixed: true,
      global: true,
      counties: null,
      launchYear: 336,
      types: ["Public"],
    };

    const shortHoliday = shortenPublicHoliday(holiday);

    expect(Object.keys(shortHoliday).length).toBe(3);
    expect(shortHoliday.name).toBe("Christmas Day");
    expect(shortHoliday.localName).toBe("Natale");
    expect(shortHoliday.date).toBe("2022-12-25");
  });
});
