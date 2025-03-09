import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <>
      <header className="flex justify-between p-[1.25rem_6rem] [box-shadow:0px_.5rem_1rem_rgba(0,0,0,0.03)] items-center max-h-[10dvh]">
        <nav className="flex-1">
          <ul className="flex gap-[5rem] font-['Inter'] font-light text-[.95rem]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Product</Link>
            </li>
            <li>
              <Link to="/">Categories</Link>
            </li>
            <li>
              <Link to="/">SALE</Link>
            </li>
          </ul>
        </nav>
        <div className="logo shrink-0 font-['Montserrat'] text-[1.2rem] border-1 p-1">
          E COM
        </div>
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
