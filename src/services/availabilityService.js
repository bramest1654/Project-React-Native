/**
 * Mock availability service
 * Sesi 11: Fetch simulation with loading/error states
 * Structure designed to be easily replaced with a real backend
 */

const MOCK_AVAILABILITY = [true, true, false, true, true, false, true];

/**
 * Simulate fetching availability data from an API.
 * Returns an array of 7 booleans (Mon-Sun).
 * In production, this would call a real endpoint.
 */
export function checkAvailability(date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_AVAILABILITY);
    }, 800);
  });
}

/**
 * Simulate fetching packages from API.
 * In production, replace with: fetch(BASE_URL + '/packages')
 */
export function fetchPackages() {
  const packages = require("../data/packages").default;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(packages);
    }, 500);
  });
}
