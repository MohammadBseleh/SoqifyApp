export interface Profile {
    socialMediaInstagram: string;
    description: string;
    socialMediaTelegram: string;
    phoneNumber: string;
    profileId: number;
    ratings: Rating[];
    location: string;
    storeWebLink: string;
    email: string;
    username: string;
    socialMediaFacebook: string;
    coverImage: string;
    profileImage: string;
  }
  
  export interface Rating {
    userId: number;
    rating: number;
    comment: string;
  }
  