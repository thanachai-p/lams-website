/**
 * LAMS PSU SURAT THANI 2026 - TUITION FEE & SCHOLARSHIP CALCULATOR
 * Modular Calculator Utility for Undergraduate & Postgraduate Programs
 */

const LAMS_PROGRAMS = {
  bba_mgmt: {
    name: 'บริหารธุรกิจบัณฑิต (การจัดการธุรกิจ)',
    semesterFee: 16000,
    years: 4,
    semesters: 8,
    loanEligible: true,
    maxLoanPerYear: 60000
  },
  ba_eng: {
    name: 'ศิลปศาสตรบัณฑิต (ภาษาอังกฤษสื่อสารธุรกิจ)',
    semesterFee: 16000,
    years: 4,
    semesters: 8,
    loanEligible: true,
    maxLoanPerYear: 60000
  },
  b_acc: {
    name: 'บัญชีบัณฑิต (Accounting)',
    semesterFee: 18000,
    years: 4,
    semesters: 8,
    loanEligible: true,
    maxLoanPerYear: 60000
  },
  bba_diploma: {
    name: 'บริหารธุรกิจบัณฑิต (เทียบโอน ปวส.)',
    semesterFee: 16000,
    years: 2,
    semesters: 4,
    loanEligible: true,
    maxLoanPerYear: 60000
  },
  mba: {
    name: 'บริหารธุรกิจมหาบัณฑิต (MBA)',
    semesterFee: 35000,
    years: 2,
    semesters: 4,
    loanEligible: false,
    maxLoanPerYear: 0
  }
};

/**
 * Calculate Estimated Tuition Fees
 * @param {string} programKey 
 * @param {string} loanType 
 * @returns {object} Calculated Results
 */
function calculateTuition(programKey, loanType = 'cash') {
  const prog = LAMS_PROGRAMS[programKey];
  if (!prog) return null;

  const totalTuition = prog.semesterFee * prog.semesters;
  const loanCoverage = loanType === 'student_loan' && prog.loanEligible
    ? Math.min(totalTuition, prog.maxLoanPerYear * prog.years)
    : 0;
  const outOfPocket = totalTuition - loanCoverage;

  return {
    programName: prog.name,
    semesterFee: prog.semesterFee,
    totalTuition: totalTuition,
    loanEligible: prog.loanEligible,
    loanCoverage: loanCoverage,
    outOfPocket: outOfPocket
  };
}

// Export for module systems or attach to window for vanilla HTML
if (typeof window !== 'undefined') {
  window.LamsCalculator = {
    programs: LAMS_PROGRAMS,
    calculate: calculateTuition
  };
}
