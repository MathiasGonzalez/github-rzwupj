import { create } from 'zustand';

export type DocumentType = 'Contract' | 'Policy' | 'Report' | 'Training' | 'Other';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  uploadedBy: string;
  uploadDate: string;
  size: number;
  relatedEmployee?: string;
  tags: string[];
  url: string;
}

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  addDocument: (document: Omit<Document, 'id'>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  searchDocuments: (query: string) => Document[];
  filterDocuments: (type?: DocumentType, employee?: string) => Document[];
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Employee Handbook 2024',
    type: 'Policy',
    uploadedBy: 'HR Manager',
    uploadDate: '2024-01-15',
    size: 2500000,
    tags: ['handbook', 'policies', 'guidelines'],
    url: '#',
  },
  {
    id: '2',
    title: 'Performance Review Q4 2023',
    type: 'Report',
    uploadedBy: 'Sarah Wilson',
    uploadDate: '2023-12-20',
    size: 1200000,
    relatedEmployee: 'Michael Chen',
    tags: ['performance', 'review', 'q4'],
    url: '#',
  },
  {
    id: '3',
    title: 'Training Certificate - Leadership',
    type: 'Training',
    uploadedBy: 'Emma Rodriguez',
    uploadDate: '2024-02-01',
    size: 800000,
    relatedEmployee: 'Emma Rodriguez',
    tags: ['training', 'leadership', 'certificate'],
    url: '#',
  },
];

const useDocumentStore = create<DocumentState>()((set, get) => ({
  documents: mockDocuments,
  isLoading: false,
  error: null,

  addDocument: async (document) => {
    set({ isLoading: true, error: null });
    try {
      const newDocument = {
        ...document,
        id: crypto.randomUUID(),
      };
      set((state) => ({
        documents: [...state.documents, newDocument],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteDocument: async (id) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  searchDocuments: (query) => {
    const { documents } = get();
    if (!query) return documents;

    const lowercaseQuery = query.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        (doc.relatedEmployee &&
          doc.relatedEmployee.toLowerCase().includes(lowercaseQuery))
    );
  },

  filterDocuments: (type, employee) => {
    const { documents } = get();
    return documents.filter(
      (doc) =>
        (!type || doc.type === type) &&
        (!employee || doc.relatedEmployee === employee)
    );
  },
}));

export default useDocumentStore;