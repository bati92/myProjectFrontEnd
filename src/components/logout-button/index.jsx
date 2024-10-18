import { useRouter } from "next/router";
import Button from "@ui/button";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        // You may want to add some notification or redirect logic here instead of logging to console
        router.replace("/login");
    };

    return (
        <Button
            color="primary-alta"
            className="sal-animate mt--20"
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay="150"
            onClick={handleLogout}
        >
            تسجيل الخروج
        </Button>
    );
};

export default LogoutButton;
