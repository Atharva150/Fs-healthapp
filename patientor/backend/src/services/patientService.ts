import patients from "../data/patients.ts";
import type { NonSensitivePatient } from "../types.ts";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

export default {
  getPatients
};