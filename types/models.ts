
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  phoneNumber: string;
  email: string;
  joined: boolean;
}

export interface JustInvitedMembers {
  phoneNumber: string;
  invited: boolean;
  error: string
}

export interface Organization {
  id: number;
  code: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
}

export interface Invitation {
  link: string;
  member: Member;
  organization: Organization
}
