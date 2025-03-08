export const Header = () => {
  return (
    <>
      <header className="flex justify-between p-[1.5rem_6rem] [box-shadow:0px_.5rem_1rem_rgba(0,0,0,0.03)] ">
        <nav className="flex-1">
          <ul className="flex gap-[5rem] font-['Inter'] font-light text-[.95rem]">
            <li>
              <a href="/" className="font-['Inter']">
                Home
              </a>
            </li>
            <li>
              <a href="/about">Product</a>
            </li>
            <li>
              <a href="/contact">Categories</a>
            </li>
            <li>
              <a href="/contact">SALE</a>
            </li>
          </ul>
        </nav>
        <div className="logo shrink-0">Logo</div>
        <aside className="flex gap-[3rem] flex-1 justify-end">
          <div className="">Search Bar</div>
          <div className="">Cart</div>
          <div className="">User</div>
        </aside>
      </header>
    </>
  );
};

export default Header;
