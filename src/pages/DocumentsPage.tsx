import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Upload, Filter, FileText, Download, Trash2, Tag } from 'lucide-react';
import useDocumentStore, { Document, DocumentType } from '../stores/documentStore';
import useEmployeeStore from '../stores/employeeStore';
import UploadDocumentModal from '../components/Documents/UploadDocumentModal';

const DocumentsPage = () => {
  const { t } = useTranslation();
  const { documents, searchDocuments, filterDocuments, deleteDocument } = useDocumentStore();
  const { employees } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DocumentType | ''>('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documentTypes: DocumentType[] = ['Contract', 'Policy', 'Report', 'Training', 'Other'];

  const filteredDocuments = searchQuery
    ? searchDocuments(searchQuery)
    : filterDocuments(selectedType as DocumentType, selectedEmployee || undefined);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await deleteDocument(id);
    }
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    switch (type) {
      case 'Contract':
        return 'bg-purple-100 text-purple-700';
      case 'Policy':
        return 'bg-blue-100 text-blue-700';
      case 'Report':
        return 'bg-green-100 text-green-700';
      case 'Training':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('documents.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('documents.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          {t('documents.upload.button')}
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('documents.filters.search')}
            className="ml-2 flex-1 border-none focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="ml-2 flex-1 border-none focus:outline-none text-sm bg-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as DocumentType)}
          >
            <option value="">{t('documents.filters.types')}</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {t(`documents.upload.form.type.options.${type.toLowerCase()}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="ml-2 flex-1 border-none focus:outline-none text-sm bg-transparent"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">{t('documents.filters.employees')}</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.document')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.type')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.relatedTo')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.uploadDate')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.size')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('documents.table.headers.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {document.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {document.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentTypeColor(document.type)}`}>
                      {t(`documents.upload.form.type.options.${document.type.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {document.relatedEmployee || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(document.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => window.open(document.url, '_blank')}
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(document.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadDocumentModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default DocumentsPage;