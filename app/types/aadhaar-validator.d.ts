declare module "aadhaar-validator" {
  const AadhaarValidator: {
    isValidNumber: (aadhaar: string) => boolean;
  };

  export default AadhaarValidator;
}
