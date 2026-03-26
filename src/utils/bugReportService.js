const ENDPOINT = import.meta.env.VITE_BUG_REPORT_ENDPOINT || 'http://localhost:3001/api/reports';

/**
 * Validates the file attachments per policy:
 * - Max 3 files
 * - Max 5MB per file
 */
export const validateBugReportFiles = (files) => {
  if (!files) return null;
  const fileArray = Array.from(files);
  
  if (fileArray.length > 3) {
    return 'tooManyFiles'; // i18n key suffix
  }
  
  const MAX_SIZE_MB = 5 * 1024 * 1024;
  for (let file of fileArray) {
    if (file.size > MAX_SIZE_MB) {
      return 'fileTooLarge'; // i18n key suffix
    }
  }
  
  return null;
};

/**
 * Submits a bug report to the backend.
 * @param {Object} formDataObj - The report details
 * @param {FileList|Array} files - The selected files
 * @returns {Promise<{success: boolean, reportId?: string, message?: string}>}
 */
export const submitBugReport = async (formDataObj, files) => {
  try {
    const formData = new FormData();
    
    // Append standard fields
    if (formDataObj.summary) formData.append('summary', formDataObj.summary);
    if (formDataObj.reproductionSteps) formData.append('reproductionSteps', formDataObj.reproductionSteps);
    if (formDataObj.expectedResult) formData.append('expectedResult', formDataObj.expectedResult);
    if (formDataObj.actualResult) formData.append('actualResult', formDataObj.actualResult);
    
    // Append files
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
         formData.append('attachments', file);
      });
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      body: formData,
      // Note: Do not set Content-Type header. Fetch sets it with the correct boundary for FormData automatically.
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Submission failed:', error);
    return { success: false, message: 'networkError' };
  }
};
