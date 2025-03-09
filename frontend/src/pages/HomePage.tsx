import {
  HeroSection,
  SeasonCollectionSection,
  BestSellerSection,
  OfferSection
} from "../components";
export const HomePage = () => {
  return (
    <>
      <div className={`w-[100%] px-[6rem] min-h[90dvh]`}>
        <HeroSection />
        <SeasonCollectionSection />
        <BestSellerSection/>
        <OfferSection/>
      </div>
    </>
  );
};
