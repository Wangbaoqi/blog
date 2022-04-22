import Link from "next/link";

import headNav from "@data/headNav";

import ThemeSwitch from "./themeSwitch";
import MobileNav from './mobileNav';

import { Logo } from '@components/ui';


export default function Header() {
  return (
    <div className="sticky top-0 ">
      <section className="max-w-screen-xl mx-auto flex justify-between items-center md:py-4 md:px-0 px-4">
        <div className="flex items-center">
          <MobileNav />
          <Link href="/">
            <div className="flex flex-col justify-start relative z-10 font-medium ob-drop-shadow cursor-pointer">
              <Logo/>
            </div>
          </Link>

          <ul className="hidden md:flex uppercase text-sm ml-10 ">
            {headNav.map((el, idx) => {
              return (
                <li key={idx} className='mr-10 text-nav-color dark:text-primary-color'>
                  <Link href={el.href}>{el.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="flex justify-between items-center ">
          <div className="flex items-center">
            <ThemeSwitch/>
            {/* <SearchIcon /> */}
          </div>
        </nav>
      </section>
    </div>
  );
}
