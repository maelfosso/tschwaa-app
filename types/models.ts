
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

export type MemberContribution = Member & { amount: number };

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

export type MemberOfSession = {
  id: number;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;

  memberId: number;
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;

  membershipId: number;
  joined:  boolean;
  jointAt: Date;

  position: string;
  role:     string;
  status:   string;
}
