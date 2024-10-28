import { create } from 'zustand';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  startDate: string;
  avatar: string;
}

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  selectedEmployee: Employee | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  setSelectedEmployee: (employee: Employee | null) => void;
  createEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

// Mock API functions
const api = {
  async getEmployees(): Promise<Employee[]> {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : [];
  },

  async addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const employees = await this.getEmployees();
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedEmployees = [...employees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return newEmployee;
  },

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee> {
    const employees = await this.getEmployees();
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return updatedEmployees.find((emp) => emp.id === id)!;
  },

  async deleteEmployee(id: string): Promise<void> {
    const employees = await this.getEmployees();
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  },
};

const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    startDate: '2022-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Product',
    role: 'Product Manager',
    status: 'Active',
    startDate: '2021-08-01',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@company.com',
    department: 'Design',
    role: 'UI Designer',
    status: 'On Leave',
    startDate: '2023-01-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '4',
    name: 'James Cooper',
    email: 'james.cooper@company.com',
    department: 'Sales',
    role: 'Sales Executive',
    status: 'Active',
    startDate: '2022-11-20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '5',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    department: 'Engineering',
    role: 'Backend Developer',
    status: 'Active',
    startDate: '2023-04-15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    status: 'Active',
    startDate: '2022-06-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    status: 'Active',
    startDate: '2023-02-28',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '8',
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    department: 'HR',
    role: 'HR Manager',
    status: 'Active',
    startDate: '2021-12-15',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '9',
    name: 'Carlos Martinez',
    email: 'carlos.martinez@company.com',
    department: 'Engineering',
    role: 'Frontend Developer',
    status: 'On Leave',
    startDate: '2022-09-10',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '10',
    name: 'Sophie Anderson',
    email: 'sophie.anderson@company.com',
    department: 'Design',
    role: 'Product Designer',
    status: 'Active',
    startDate: '2023-03-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
];

const useEmployeeStore = create<EmployeeState>()((set) => ({
  employees: [],
  isLoading: false,
  error: null,
  selectedEmployee: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const employees = await api.getEmployees();
      set({ employees, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ isLoading: true, error: null });
    try {
      const newEmployee = await api.addEmployee(employee);
      set((state) => ({
        employees: [...state.employees, newEmployee],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateEmployee: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEmployee = await api.updateEmployee(id, updates);
      set((state) => ({
        employees: state.employees.map((emp) =>
          emp.id === id ? updatedEmployee : emp
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteEmployee: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteEmployee(id);
      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setSelectedEmployee: (employee) => {
    set({ selectedEmployee: employee });
  },

  createEmployee: async (employee) => {
    // Implementation for creating an employee
  },
}));

// Initialize the store with dummy data
const initializeStore = async () => {
  const store = useEmployeeStore.getState();
  
  // Only initialize if there's no data
  const existingEmployees = await api.getEmployees();
  if (existingEmployees.length === 0) {
    localStorage.setItem('employees', JSON.stringify(initialEmployees));
    store.fetchEmployees();
  }
};

initializeStore();

export default useEmployeeStore;
