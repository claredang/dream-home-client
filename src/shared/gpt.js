export function removeLocation(all_listings) {
  console.log(all_listings);

  const uniqueLocations = [
    ...new Set(all_listings.map((item) => item.location)),
  ];
  console.log(uniqueLocations);
  const listing = all_listings.map((obj) => {
    const { image_url, ...rest } = obj;
    return rest;
  });
  return listing;
}

// axios.get("https://api.github.com/orgs/axios").then(
//   (response) => {
//     console.log(response.data);
//   },
//   (error) => {
//     console.log(error);
//   }
// );
