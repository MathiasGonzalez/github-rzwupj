import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Upload, FileText, Tag, FileCheck, FileSpreadsheet, FileText as FileTextIcon, GraduationCap, Files, User } from 'lucide-react';
import useDocumentStore, { DocumentType } from '../../stores/documentStore';
import useEmployeeStore from '../../stores/employeeStore';

interface UploadDocumentModalProps {
  onClose: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { addDocument } = useDocumentStore();
  const { employees } = useEmployeeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '' as DocumentType,
    relatedEmployee: '',
    tags: [''],
  });

  const documentTypes = [
    { type: 'Contract' as DocumentType, Icon: FileCheck, label: t('documents.upload.form.type.options.contract') },
    { type: 'Policy' as DocumentType, Icon: FileSpreadsheet, label: t('documents.upload.form.type.options.policy') },
    { type: 'Report' as DocumentType, Icon: FileTextIcon, label: t('documents.upload.form.type.options.report') },
    { type: 'Training' as DocumentType, Icon: GraduationCap, label: t('documents.upload.form.type.options.training') },
    { type: 'Other' as DocumentType, Icon: Files, label: t('documents.upload.form.type.options.other') },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        title: file.name.split('.')[0],
      }));
    }
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;

    if (index === newTags.length - 1 && value) {
      newTags.push('');
    }

    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const getCurrentTypeIcon = () => {
    const typeConfig = documentTypes.find(t => t.type === formData.type);
    const IconComponent = typeConfig ? typeConfig.Icon : Files;
    return <IconComponent className="h-5 w-5 text-gray-400" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !formData.type) return;

    setIsSubmitting(true);
    try {
      const document = {
        title: formData.title,
        type: formData.type,
        uploadedBy: 'Current User',
        uploadDate: new Date().toISOString(),
        size: selectedFile.size,
        relatedEmployee: formData.relatedEmployee || undefined,
        tags: formData.tags.filter(Boolean),
        url: URL.createObjectURL(selectedFile),
      };

      await addDocument(document);
      onClose();
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('documents.upload.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {selectedFile ? (
                      <span className="text-blue-600">{selectedFile.name}</span>
                    ) : (
                      <span className="text-blue-600">{t('documents.upload.dragDrop.title')}</span>
                    )}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    {t('documents.upload.dragDrop.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('documents.upload.form.title')}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('documents.upload.form.type.label')}
                </label>
                <div className="relative mt-1">
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as DocumentType,
                      }))
                    }
                    className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t('documents.upload.form.type.placeholder')}</option>
                    {documentTypes.map(({ type, label }) => (
                      <option key={type} value={type}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCurrentTypeIcon()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('documents.upload.form.relatedEmployee.label')}
                </label>
                <div className="relative mt-1">
                  <select
                    value={formData.relatedEmployee}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        relatedEmployee: e.target.value,
                      }))
                    }
                    className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{t('documents.upload.form.relatedEmployee.placeholder')}</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('documents.upload.form.tags.label')}
                </label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder={t('documents.upload.form.tags.placeholder')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !selectedFile}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isSubmitting ? t('documents.upload.buttons.uploading') : t('documents.upload.buttons.upload')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('documents.upload.buttons.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;