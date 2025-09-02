// services/forexApi.ts
// export async function fetchBanks(withRecentEx = true) {
//   try {
//     const res = await fetch(
//       `https://api.et-forex.com/api/v1/banks?withRecentEx=${withRecentEx}`,
//       {
//         headers: {
//           "x-api-key":
//             "dd9feca813e7dc6e54a8ad40fc12853ce0bda8f4aad075acccdbaf40ad59bc00 ",
//         },
//       }
//     );
//     if (!res.ok) throw new Error("Failed to fetch banks");
//     return res.json();
//   } catch (error) {
//     console.error("Error fetching banks:", error);
//     throw error;
//   }
// }
// services/bankService.ts
export async function fetchBanks(withRecentEx = true) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banks?withRecentEx=${withRecentEx}`,
    {
      headers: {
        "x-api-key":
          "dd9feca813e7dc6e54a8ad40fc12853ce0bda8f4aad075acccdbaf40ad59bc00 ",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch banks");
  }

  const json = await res.json();
  // Always return an array
  return json.data || [];
}
