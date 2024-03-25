import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { validateInput, shortenPublicHoliday } from "../helpers";

jest.mock("axios");
jest.mock("../helpers");

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockShortenPublicHoliday = shortenPublicHoliday as jest.MockedFunction<
  typeof shortenPublicHoliday
>;

const mockData = [
  {
    name: "Christmas Day",
    localName: "Natale",
    date: "2022-12-25",
    countryCode: "IT",
    fixed: true,
    global: true,
    counties: ["DE", "NL"],
    launchYear: 336,
    types: ["Public"],
  },
];

describe("public holidays service unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch list of public holidays", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockData });
    mockShortenPublicHoliday.mockImplementation((holiday) => holiday);

    const result = await getListOfPublicHolidays(2022, "NL");

    expect(validateInput).toBeCalledWith({ year: 2022, country: "NL" });
    expect(result).toEqual(mockData);
  });

  it("should check if today is a public holiday", async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday("FR");

    expect(validateInput).toBeCalledWith({ country: "FR" });
    expect(result).toEqual(true);
  });

  it("should fetch next public holidays", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockData });
    mockShortenPublicHoliday.mockImplementation((holiday) => holiday);

    const result = await getNextPublicHolidays("NL");

    expect(validateInput).toBeCalledWith({ country: "NL" });
    expect(result).toEqual(mockData);
  });

  it("should return empty array when getListOfPublicHolidays have error", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("API Error!"));

    const result = await getListOfPublicHolidays(2022, "US");

    expect(validateInput).toBeCalledWith({ year: 2022, country: "US" });
    expect(result).toEqual([]);
  });

  it("should return false when checkIfTodayIsPublicHoliday have error", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("API Error!"));

    const result = await checkIfTodayIsPublicHoliday("US");

    expect(validateInput).toBeCalledWith({ country: "US" });
    expect(result).toEqual(false);
  });

  it("should return empty array when getNextPublicHolidays have error", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("API Error!"));

    const result = await getNextPublicHolidays("US");

    expect(validateInput).toBeCalledWith({ country: "US" });
    expect(result).toEqual([]);
  });
});
