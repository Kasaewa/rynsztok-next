// główny plik layoutu strony, czyli to co będzie "doklejone" do każdej podstrony - boczna nawigacja, header, footer itp.

import { Navbar } from "./Navbar";
import { SideNavigation } from "./SideNavigation";
import styles from "./styles/Layout.module.scss";
import { PageWrapper } from "../common/PageContainer";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Sprawdzamy czy jesteśmy na stronie logowania lub rejestracji
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Jeśli jesteśmy na stronie auth, zwracamy tylko children bez layoutu - bo nie chcemy mieć bocznego menu i gornego menu i stopki
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layoutWrapper}>
      <Navbar />
      <SideNavigation />
      <PageWrapper>{children}</PageWrapper>;
    </div>
  );
};
