// wspolny wrapper dla wszystkich podstron, dla części z treścią (bez menu/stopki/ogolnie layoutu) czyli to co posrodku
// po to sie robi ten komponent zeby miec stałą szerokosc i inne style dla wszystkich podstron

import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div>{children}</div>;
};
