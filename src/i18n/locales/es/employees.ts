export const employees = {
  title: "Empleados",
  subtitle: "Administra los miembros de tu equipo y su acceso",
  addButton: "Agregar Empleado",
  table: {
    employee: "Empleado",
    department: "Departamento",
    role: "Rol",
    status: "Estado",
    actions: "Acciones"
  },
  detail: {
    title: "Detalles del Empleado",
    contact: {
      email: "Correo electrónico",
      phone: "Teléfono",
      startDate: "Fecha de inicio",
      department: "Departamento",
      status: "Estado"
    },
    status: {
      active: "Activo",
      onLeave: "De permiso",
      inactive: "Inactivo"
    },
    meeting: {
      schedule: "Programar Reunión",
      scheduling: "Programando Reunión",
      form: {
        title: "Programar reunión con {{name}}",
        meetingTitle: "Título de la reunión",
        date: "Fecha",
        time: "Hora",
        duration: "Duración",
        type: "Tipo de reunión",
        location: "Ubicación",
        description: "Descripción",
        additionalAttendees: "Participantes adicionales",
        agenda: "Puntos de la agenda",
        recurring: "Recurrente",
        submit: "Programar Reunión",
        cancel: "Cancelar",
        types: {
          inPerson: "Presencial",
          virtual: "Virtual"
        },
        recurring: {
          none: "Una vez",
          daily: "Diario",
          weekly: "Semanal",
          monthly: "Mensual"
        },
        duration: {
          m15: "15 minutos",
          m30: "30 minutos",
          m45: "45 minutos",
          h1: "1 hora",
          h15: "1.5 horas",
          h2: "2 horas"
        },
        placeholders: {
          title: "Reunión 1:1",
          location: {
            inPerson: "Sala de conferencias",
            virtual: "Enlace de Zoom/Meet"
          },
          email: "correo@empresa.com",
          agenda: "Agregar punto de agenda...",
          description: "Detalles adicionales de la reunión..."
        }
      }
    }
  }
};