
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;
  email: string;
}

export interface Adhesion {
  id: number;
  joined:  boolean;
  jointAt: Date;

  position: string;
  role:     string;
  status:   string;
}

export type OrganizationMember = Member & Omit<Adhesion, "id">;

export interface JustInvitedMembers {
  phone: string;
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

export interface Session {
  id: number;
  startDate: Date;
  endDate: Date;
  inProgress: true;
  organizationID: number;
}
