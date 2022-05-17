// https://tailwindui.com/components/application-ui/elements/dropdowns
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function MyMenu({ children, title, direction, isGenre }: Props) {
  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-800/50 px-4 py-2 text-sm font-bold uppercase text-slate-300 shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900">
          {title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute ${
            isGenre ? "top-20" : "top-11"
          } left-0 sm:top-auto sm:${direction}-0 mt-2  w-full origin-top-left rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-56 `}
        >
          <div className={`grid-cols-2 py-1 sm:block ${isGenre ? "grid" : ""}`}>
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface Props {
  children: React.ReactNode;
  title: string;
  direction: "left" | "right";
  isGenre?: boolean;
}
