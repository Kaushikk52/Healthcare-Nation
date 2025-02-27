import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation(); // Get current route path

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [pathname]); // Run effect when pathname changes

    return null;
}

export default ScrollToTop