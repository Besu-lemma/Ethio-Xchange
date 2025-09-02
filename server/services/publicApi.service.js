const fetch = require("node-fetch");

const API_BASE = process.env.FOREX_BASE_URL;
const API_KEY = process.env.FOREX_API_KEY;

async function apiFetch(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json();
}

// 1. Banks
async function getBanks(withRecentEx = false) {
  const query = withRecentEx ? "?withRecentEx=true" : "";
  return apiFetch(`/banks${query}`);
}

// 2. Currencies
async function getCurrencies() {
  return apiFetch(`/currencies`);
}

// 3. Rates
async function getRates(bankId) {
  const query = bankId ? `?bankId=${bankId}` : "";
  return apiFetch(`/rates${query}`);
}

// 4. Best Rates
async function getBestRates() {
  return apiFetch(`/rates/best-rates`);
}

// 5. History
async function getBankHistory(bankId, date) {
  if (!bankId || !date) throw new Error("bankId and date are required");
  return apiFetch(`/history?bankId=${bankId}&date=${date}`);
}

module.exports = {
  getBanks,
  getCurrencies,
  getRates,
  getBestRates,
  getBankHistory,
};
