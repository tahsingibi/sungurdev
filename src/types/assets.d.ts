declare module "*.png" {
  const image: import("next/image").StaticImageData;
  export default image;
}

declare module "*.jpeg" {
  const image: import("next/image").StaticImageData;
  export default image;
}

declare module "*.svg" {
  const image: string;
  export default image;
}
