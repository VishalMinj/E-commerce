export const BestSellerSection = () => {
  return (
    <>
      <section className="w-[100%] h-[90dvh] p-[1.25rem]">
        <div className="best-seller w-[100%] min-h-[100%] flex flex-col gap-[2.5rem]">
          <div className=" title text-center text-[2.75rem] font-[600]">
            Our Best Seller
          </div>
          <div className="best-seller-container flex flex-1 gap-[2.5rem]">
            <div className="best-seller1 flex flex-col flex-1 gap-[.5rem] p-[.25rem]">
              <div className="img flex-1 bg-[var(--primary-color)]"></div>
              <div className="info text-center">
                <div className="name">name</div>
                <div className="price">$0.00</div>
              </div>
            </div>
            <div className="best-seller2 flex flex-col flex-1 gap-[.5rem] p-[.25rem]">
              <div className="img flex-1 bg-[var(--primary-color)]"></div>
              <div className="info text-center">
                <div className="name">name</div>
                <div className="price">$0.00</div>
              </div>
            </div>
            <div className="best-seller3 flex flex-col flex-1 gap-[.5rem] p-[.25rem]">
              <div className="img flex-1 bg-[var(--primary-color)]"></div>
              <div className="info text-center">
                <div className="name">name</div>
                <div className="price">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestSellerSection;
