import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { submitBugReport, validateBugReportFiles } from '../../utils/bugReportService';

const BugReportModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        summary: '',
        reproductionSteps: '',
        expectedResult: '',
        actualResult: ''
    });
    
    const [files, setFiles] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [reportId, setReportId] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setErrorMessage('');
        
        const validationErrorKey = validateBugReportFiles(selectedFiles);
        if (validationErrorKey) {
            setErrorMessage(t(`bugReport.errors.${validationErrorKey}`, t(`modals.bugReport.errors.${validationErrorKey}`)));
            setFiles(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            setFiles(selectedFiles);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (errorMessage) return;

        setStatus('submitting');
        setErrorMessage('');
        
        const result = await submitBugReport(formData, files);
        
        if (result.success) {
            setStatus('success');
            setReportId(result.reportId);
        } else {
            setStatus('error');
            setErrorMessage(t(`bugReport.errors.${result.message || 'general'}`, t(`modals.bugReport.errors.${result.message || 'general'}`)));
        }
    };

    const handleClose = () => {
        setFormData({ summary: '', reproductionSteps: '', expectedResult: '', actualResult: '' });
        setFiles(null);
        setStatus('idle');
        setErrorMessage('');
        setReportId('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pt-10 pb-10">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="relative bg-stone-900 border-4 border-stone-600 rounded-2xl p-6 md:p-8 max-w-2xl w-full mx-4 shadow-2xl overflow-y-auto max-h-[90vh] custom-scroll">
                
                {status === 'success' ? (
                    <div className="flex flex-col items-center text-center py-8">
                        <div className="text-5xl mb-4">✅</div>
                        <h2 className="text-3xl font-bold text-slate-300 uppercase tracking-wider mb-4">
                            {t('modals.bugReport.title')}
                        </h2>
                        <p className="text-green-400 text-xl font-bold mb-6">
                            {t('modals.bugReport.success.message', { reportId })}
                        </p>
                        <button 
                            onClick={handleClose}
                            className="px-6 py-3 bg-stone-700 hover:bg-stone-600 text-white rounded-lg font-bold"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-300 uppercase tracking-wider mb-2">
                                {t('modals.bugReport.title')}
                            </h2>
                            <p className="text-stone-400 text-lg md:text-xl">
                                {t('modals.bugReport.sympathy')}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-1">
                                    {t('modals.bugReport.fields.summary')} *
                                </label>
                                <input 
                                    type="text" 
                                    name="summary" 
                                    required
                                    value={formData.summary} 
                                    onChange={handleChange}
                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded p-2 text-slate-200 outline-none focus:border-blue-500"
                                    placeholder="..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-1">
                                    {t('modals.bugReport.fields.detailedSteps')}
                                </label>
                                <textarea 
                                    name="reproductionSteps" 
                                    value={formData.reproductionSteps} 
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded p-2 text-slate-200 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-1">
                                        {t('modals.bugReport.fields.expectedResult')}
                                    </label>
                                    <textarea 
                                        name="expectedResult" 
                                        value={formData.expectedResult} 
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded p-2 text-slate-200 outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-1">
                                        {t('modals.bugReport.fields.actualResult')}
                                    </label>
                                    <textarea 
                                        name="actualResult" 
                                        value={formData.actualResult} 
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded p-2 text-slate-200 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-1">
                                    {t('modals.bugReport.fields.attachments')}
                                </label>
                                <input 
                                    type="file" 
                                    multiple 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-stone-700 file:text-slate-300 hover:file:bg-stone-600 cursor-pointer"
                                />
                                {errorMessage && (
                                    <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button 
                                    type="button" 
                                    onClick={handleClose}
                                    disabled={status === 'submitting'}
                                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 text-slate-300 rounded font-bold transition-colors disabled:opacity-50"
                                >
                                    {t('modals.bugReport.actions.cancel')}
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={status === 'submitting' || !!errorMessage}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 uppercase tracking-wide"
                                >
                                    {status === 'submitting' ? t('modals.bugReport.actions.submitting') : t('modals.bugReport.actions.submit')}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(BugReportModal);
