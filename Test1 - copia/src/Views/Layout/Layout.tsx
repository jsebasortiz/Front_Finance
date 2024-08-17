import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom";
import { NavbarNested } from "../../Components/NavBar/NavBarNest";

function Layout() {
    return (
        <AppShell
            navbar={{ width: 300, breakpoint: "sm" }}
        >
            <AppShell.Navbar>
                <NavbarNested />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
export default Layout