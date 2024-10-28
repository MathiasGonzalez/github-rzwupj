export const employees = {
  title: "Employees",
  subtitle: "Manage your team members and their access",
  addButton: "Add Employee",
  table: {
    employee: "Employee",
    department: "Department",
    role: "Role",
    status: "Status",
    actions: "Actions"
  },
  detail: {
    title: "Employee Details",
    contact: {
      email: "Email",
      phone: "Phone",
      startDate: "Started",
      department: "Department",
      status: "Status"
    },
    status: {
      active: "Active",
      onLeave: "On Leave",
      inactive: "Inactive"
    },
    meeting: {
      schedule: "Schedule Meeting",
      scheduling: "Scheduling Meeting",
      form: {
        title: "Schedule Meeting with {{name}}",
        meetingTitle: "Meeting Title",
        date: "Date",
        time: "Time",
        duration: "Duration",
        type: "Meeting Type",
        location: "Location",
        description: "Description",
        additionalAttendees: "Additional Attendees",
        agenda: "Agenda Items",
        recurring: "Recurring",
        submit: "Schedule Meeting",
        cancel: "Cancel",
        types: {
          inPerson: "In-person",
          virtual: "Virtual"
        },
        recurring: {
          none: "One-time",
          daily: "Daily",
          weekly: "Weekly",
          monthly: "Monthly"
        },
        duration: {
          m15: "15 minutes",
          m30: "30 minutes",
          m45: "45 minutes",
          h1: "1 hour",
          h15: "1.5 hours",
          h2: "2 hours"
        },
        placeholders: {
          title: "1:1 Meeting",
          location: {
            inPerson: "Conference Room",
            virtual: "Zoom/Meet Link"
          },
          email: "email@company.com",
          agenda: "Add agenda item...",
          description: "Additional meeting details..."
        }
      }
    }
  }
};