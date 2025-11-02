export interface Post {
    content: string | null;
    createdAt: string;
    id: number;
    imageUrl: string | null;
    updatedAt: string | null;
    userId: number;
    videoUrl: string | null;
    user?: User;
}

export interface User {
    createdAt: string;
    email: string;
    id: number;
    name: string;
    profile?: Profile;
}

export interface Profile {
    accountType?: string;
    allowFriendRequests?: number;
    allowMessagesFrom?: string;
    bio?: string;
    coverPhotoUrl?: string;
    createdAt?: string;
    dateOfBirth?: string | null;
    displayName?: string | null;
    emailVerifiedAt?: string | null;
    followersCount?: number;
    followingCount?: number;
    gender?: string | null;
    id?: 50;
    interests?: string | null;
    isActive?: 1;
    isPrivate?: 0;
    isVerified?: 0;
    lastSeenAt?: string | null;
    location?: string | null;
    notificationPreferences?: string | null;
    phoneNumber?: string | null;
    postsCount?: 0;
    profilePictureUrl: string | null;
    showBirthday?: 1;
    showEmail?: 0;
    showPhone?: 0;
    socialLinks?: string | null;
    timezone?: string | null;
    updatedAt?: string | null;
    userId?: 1;
    username?: string | null;
    websiteUrl?: string | null;
}

export interface ProfileWithUser extends Profile {
    user: User;
}

export interface Suggestion {
    id: number;
    name: string;
    avatarUrl: string;
}

export interface Friend {
    id: number;
    name: string;
    avatarUrl: string;
}

export interface ProfilePageProps {
    profile: ProfileWithUser | null;
    posts: Post[] | null;
    suggestions: Suggestion[];
    friends: Friend[];
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}
