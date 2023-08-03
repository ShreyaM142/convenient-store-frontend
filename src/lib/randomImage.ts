export const randomImage = (sub?: string) =>
  "https://source.unsplash.com/random/?" + sub?.split(" ").join(",");
