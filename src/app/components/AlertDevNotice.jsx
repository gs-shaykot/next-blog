"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AlertDevNotice() {
    useEffect(() => {
        // check if alert was already shown
        const hasShown = sessionStorage.getItem("devNoticeShown");

        if (!hasShown) {
            Swal.fire({
                title: "⚠️ Under Development",
                text: "This site is still under development, so some features & CSS styles may not work properly.",
                icon: "info",
                confirmButtonText: "Okay, got it!",
                confirmButtonColor: "#2563eb",
            }).then(() => {
                // mark as shown
                sessionStorage.setItem("devNoticeShown", "true");
            });
        }
    }, []);

    return null;
}
