import { Employee } from '../stores/employeeStore';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API error
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const api = {
  async getEmployees(): Promise<Employee[]> {
    await delay(800);
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
  },

  async getEmployee(id: string): Promise<Employee> {
    await delay(500);
    const employees = await this.getEmployees();
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
      throw new APIError(404, 'Employee not found');
    }
    return employee;
  },

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    await delay(1000);
    const newEmployee = {
      ...employee,
      id: crypto.randomUUID(),
    };
    const employees = await this.getEmployees();
    const updatedEmployees = [...employees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return newEmployee;
  },

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee> {
    await delay(800);
    const employees = await this.getEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      throw new APIError(404, 'Employee not found');
    }
    const updatedEmployee = { ...employees[index], ...updates };
    employees[index] = updatedEmployee;
    localStorage.setItem('employees', JSON.stringify(employees));
    return updatedEmployee;
  },

  async deleteEmployee(id: string): Promise<void> {
    await delay(800);
    const employees = await this.getEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      throw new APIError(404, 'Employee not found');
    }
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
  },
};