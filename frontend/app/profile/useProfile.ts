import { useState } from "react";

export function useProfile() {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState();
}
