export const SeasonCollectionSection = () => {
  return (
    <>
      <section className="w-[100%] h-[100dvh] p-[2rem_0_2.5rem_0]">
        <div className="season-section w-[100%] min-h-[100%] flex flex-col gap-[2rem]">
          <div className=" title text-center text-[2.25rem] font-[600]">
            Season Collections
          </div>
          <div className="gallery flex flex-1 gap-[2rem]">
            <div className="season-container flex-1 flex flex-col gap-[1rem]">
              <div className="img flex-1 w-[100%] bg-[var(--primary-color)]">
                <img src="" alt="img" />
              </div>
              <div className="season text-center text-[1.75rem] font-[550]">SPRING</div>
              <div className="more text-center ">
                <button className="bg-[var(--primary-color)] p-[.5rem_1.5rem] font-medium rounded-full">MORE</button>
              </div>
            </div>
            <div className="season-container flex-1 flex flex-col gap-[1rem]">
              <div className="img flex-1 w-[100%] bg-[var(--primary-color)]">
                <img src="" alt="img" />
              </div>
              <div className="season text-center text-[1.75rem] font-[550]">SUMMER</div>
              <div className="more text-center ">
                <button className="bg-[var(--primary-color)] p-[.5rem_1.5rem] font-medium rounded-full">MORE</button>
              </div>
            </div>
            <div className="season-container flex-1 flex flex-col gap-[1rem]">
              <div className="img flex-1 w-[100%] bg-[var(--primary-color)]">
                <img src="" alt="img" />
              </div>
              <div className="season text-center text-[1.75rem] font-[550]">WINTER</div>
              <div className="more text-center ">
                <button className="bg-[var(--primary-color)] p-[.5rem_1.5rem] font-medium rounded-full">MORE</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
