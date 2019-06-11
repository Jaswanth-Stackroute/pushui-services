export interface IStudent {
  webPages: any[];
  isChecked:boolean;
        lastName?: any;
        tcStatus?: any;
        education: any[];
        gender?: any;
        subject: any[];
        roles: string[];
        channel: string;
        language: any[];
        updatedDate: string;
        skills: any[];
        badgeAssertions: any[];
        isDeleted: boolean;
        organisations: Organisation[];
        provider?: any;
        countryCode?: any;
        id: string;
        tempPassword?: any;
        identifier: string;
        thumbnail?: any;
        updatedBy: string;
        jobProfile: any[];
        address: any[];
        phoneVerified: boolean;
        profileSummary: string;
        tcUpdatedDate?: any;
        locationIds: any[];
        registryId: string;
        avatar?: any;
        userName: string;
        rootOrgId: string;
        firstName: string;
        emailVerified: boolean;
        lastLoginTime?: any;
        tncAcceptedOn?: any;
        createdDate: string;
        framework: Framework;
        createdBy?: any;
        dob?: any;
        grade: any[];
        currentLoginTime?: any;
        location?: any;
        userType: string;
        tncAcceptedVersion?: any;
        status: number;
}
export interface Organisation {
       organisationId: string;
       updatedBy?: any;
       addedByName?: any;
       addedBy?: any;
       roles: string[];
       approvedBy?: any;
       updatedDate: string;
       userId: string;
       approvaldate?: any;
       isDeleted: boolean;
       hashTagId: string;
       isRejected: boolean;
       id: string;
       position?: any;
       isApproved: boolean;
       orgjoindate: string;
       orgLeftDate?: any;
   }

   export interface Framework {
       gradeLevel: string[];
       subject: string[];
       id: string[];
       medium: string[];
       board: string[];
   }
