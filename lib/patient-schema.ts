// lib/patient-schema.ts
//
// Every assumption about the Patient__c object lives here.
// Matched to the Patient fields shown in Setup > Object Manager.

export const PATIENT_OBJECT = process.env.SF_PATIENT_OBJECT ?? 'Patient__c';

/**
 * Patient_ID__c is an Auto Number field. It cannot be written, but it CAN be
 * read back after the insert — which makes it a real reference number to show
 * the patient, unlike a Name field they typed in themselves.
 */
export const PATIENT_REFERENCE_FIELD = 'Patient_ID__c';

/**
 * Field mapping.
 *
 * This org has a separate First_Name__c field. Name is labelled "Patient Name"
 * and stores the combined first and last names, generated on the server.
 */
export const F = {
  recordName: 'Name',                  // Text(80) — derived from first + last name
  firstName: 'First_Name__c',           // Text(50)
  lastName: 'Last_Name__c',            // Text(50)
  dateOfBirth: 'Date_of_Birth__c',     // Date
  age: 'Age__c',                       // Number(3,0) — age at registration
  email: 'Email__c',                   // Email
  phone: 'Phone__c',                   // Phone
  address: 'Address__c',               // Text Area(255)
  patientStatus: 'Status__c',  // Picklist — set by the org, not the patient
} as const;

/**
 * Written on every new record.
 *
 * This value MUST match the picklist definition in your org exactly, including
 * case and spacing. Check Setup > Object Manager to confirm it — a mismatch on a
 * restricted picklist fails at insert with
 * INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST, which reads like a permissions error
 * and is not one.
 */
export const DEFAULTS: Record<string, unknown> = {
  [F.patientStatus]: 'New',
};

/** Salesforce field lengths. Enforced client-side and again on the server. */
export const LIMITS = {
  recordName: 80,
  firstName: 50,
  lastName: 50,
  email: 80,
  phone: 40,
  address: 255,
} as const;

/** Plausible bounds for a registration, used to sanity-check the date of birth. */
export const AGE_BOUNDS = { min: 0, max: 130 } as const;
