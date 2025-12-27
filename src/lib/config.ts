export interface FormFieldConfig {
  name: string
  label: string
  placeholder: string
  description: string
  type: 'text' | 'number' | 'url' | 'textarea'
  required: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  validationMessage?: string
}

export interface FormSectionConfig {
  id: string
  title: string
  description: string
  icon: string 
  fields: FormFieldConfig[]
}

export interface ApplicationConfig {
  // Admin Configuration
  adminDiscordIds: string[]

  // Age Requirements
  minimumAge: number

  // Form Configuration
  sections: FormSectionConfig[]

  // Validation Messages
  messages: {
    ageRequirement: string
    steamIdInvalid: string
    cfxUrlInvalid: string
    experienceMinLength: string
    characterMinLength: string
  }

  // Discord Bot Configuration
  discordBot: {
    serverName: string;
    serverIcon: string;
    footerText: string;
  };

  // UI Configuration
  ui: {
    formTitle: string;
    formDescription: string;
    submitButtonText: string;
    submittingButtonText: string;
    successTitle: string;
    successDescription: string;
    errorTitle: string;
    errorDescription: string;
  };
}

export const applicationConfig: ApplicationConfig = {
  // Admin Discord IDs - Add your admin Discord user IDs here
  adminDiscordIds: [
    '282569097664004096', // chede00
  ],

  // Minimum age requirement for applications
  minimumAge: 18,

  // Form sections and fields configuration
  sections: [
    {
      id: 'personal',
      title: 'Información Personal',
      description: 'Solo te pediremos que nos confirmes que tienes +18',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      fields: [
        {
          name: 'age',
          label: 'Edad',
          placeholder: '18+',
          description: 'Debes tener 18 años o más para acceder al servidor',
          type: 'number',
          required: true,
          validationMessage: 'Debes tener al menos 18 años',
        },
        {
          name: 'experience',
          label: 'Experiencia Previa en Servidores de RP',
          placeholder: 'Describe qué has hecho en servidores de rol previamente. ¡Si no has roleado antes no pasa nada!',
          description: 'Cuéntanos brevemente sobre tu experiencia previa en servidores de rol.',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      id: 'background',
      title: 'Características Principales',
      description: 'Información detallada de antecedentes',
      icon: 'M4 6h16M4 12h16M4 18h16',
      fields: [
        {
          name: 'birthplace',
          label: 'Lugar de Nacimiento',
          placeholder: 'Ciudad, Estado/País',
          description: '¿Dónde nació tu personaje?',
          type: 'text',
          required: true,
          minLength: 1,
        },
        {
          name: 'occupation',
          label: 'Ocupación Anterior',
          placeholder: '¿A qué se dedica tu personaje?',
          description: 'Trabajo/carrera del personaje antes de los eventos actuales',
          type: 'textarea',
          required: true,
          minLength: 1,
        },
        {
          name: 'education',
          label: 'Nivel Educativo',
          placeholder: 'Secundaria, universidad, etc.',
          description: 'Máximo nivel educativo completado',
          type: 'text',
          required: true,
          minLength: 1,
        },
        {
          name: 'qualities',
          label: 'Cualidades Principales',
          placeholder: 'Describe las cualidades más destacadas de tu personaje',
          description: 'Enumera y explica las características positivas que definen a tu personaje',
          type: 'textarea',
          required: true,
          minLength: 100,
          validationMessage: 'Por favor proporciona al menos 100 caracteres describiendo las cualidades de tu personaje.',
        },
        {
          name: 'criminalRecord',
          label: 'Antecedentes Penales',
          placeholder: 'Describe si tu personaje tiene antecedentes penales',
          description: 'Detalla cualquier delito o problema legal que haya tenido tu personaje',
          type: 'textarea',
          required: true,
          validationMessage: 'Si tu personaje tiene antecedentes, proporciónalos. Si no es así, indícalo.',
          minLength: 1,
        }
      ],
    },
    {
      id: 'roleplay',
      title: 'Historia del Personaje',
      description: 'Cuéntanos sobre tu experiencia previa y define la historia de tu personaje.',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      fields: [
        {
          name: 'description',
          label: 'Descripción Física de tu Personaje',
          placeholder: 'Describe la apariencia física de tu personaje',
          description: 'Proporciona una descripción detallada de la apariencia física de tu personaje.',
          type: 'textarea',
          required: true,
          minLength: 100,
          validationMessage: 'Por favor proporciona al menos 100 caracteres.',
        },
        {
          name: 'character',
          label: 'Historia del Personaje',
          placeholder: 'Escribe aquí la historia de tu personaje...',
          description: 'Proporciona una historia detallada de tu personaje',
          type: 'textarea',
          required: true,
          minLength: 500,
          validationMessage: 'Por favor proporciona al menos 500 caracteres sobre la historia de tu personaje.',
        },
        {
          name: 'motivation',
          label: '¿Qué motiva a tu personaje?',
          placeholder: 'Describe qué impulsa a tu personaje...',
          description: 'Explica las principales motivaciones y objetivos de tu personaje',
          type: 'textarea',
          required: true,
          minLength: 100,
          validationMessage: 'Por favor proporciona al menos 100 caracteres sobre la motivación de tu personaje.',
        },
        {
          name: 'weaknesses',
          label: 'Debilidades del Personaje',
          placeholder: '¿Cuáles son los defectos y debilidades de tu personaje?',
          description: 'Describe los defectos del personaje que lo hacen más humano',
          type: 'textarea',
          required: true,
          minLength: 100,
          validationMessage: 'Por favor proporciona al menos 100 caracteres.',
        }
      ],
    },
  ],

  messages: {
    ageRequirement: 'Debes tener al menos 18 años.',
    steamIdInvalid: 'Steam ID inválido. Debe ser un número de 17 dígitos.',
    cfxUrlInvalid: 'Por favor ingresa una URL válida de cuenta CFX.',
    experienceMinLength: 'Por favor proporciona al menos 50 caracteres sobre tu experiencia de RP.',
    characterMinLength: 'Por favor proporciona al menos 100 caracteres sobre la historia de tu personaje.',
  },

  ui: {
    formTitle: 'Formulario de Solicitud',
    formDescription: 'Completa toda la información requerida para enviar tu solicitud de whitelist',
    submitButtonText: 'Enviar Solicitud',
    submittingButtonText: 'Enviando Solicitud...',
    successTitle: 'Solicitud Enviada',
    successDescription: 'Tu solicitud de whitelist ha sido recibida. La revisaremos en breve.',
    errorTitle: 'Error de Envío',
    errorDescription: 'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo más tarde.',
  },

  discordBot: {
    serverName: "Sigma RP",
    serverIcon: "https://i.postimg.cc/KcJnZJ3x/symbol.png",
    footerText: "",
  },
}

/*
EXAMPLES: How to add more questions and categories

1. Adding questions to existing roleplay section:
   Add these fields to the 'roleplay' section fields array:

   {
     name: 'motivation',
     label: 'What motivates your character?',
     placeholder: 'Describe what drives your character...',
     description: 'Explain your character\'s main motivations and goals',
     type: 'textarea',
     required: true,
     minLength: 50,
     validationMessage: 'Please provide at least 50 characters about your character\'s motivation.',
   },
   {
     name: 'weaknesses',
     label: 'Character Weaknesses',
     placeholder: 'What are your character\'s flaws and weaknesses?',
     description: 'Describe character flaws that make them more realistic',
     type: 'textarea',
     required: false,
     minLength: 30,
   }

2. Creating a new category/section:
   Add this object to the sections array:

   {
     id: 'background',
     title: 'Background & History',
     description: 'Detailed background information',
     icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
     fields: [
       {
         name: 'birthplace',
         label: 'Place of Birth',
         placeholder: 'City, State/Country',
         description: 'Where was your character born?',
         type: 'text',
         required: true,
       },
       {
         name: 'occupation',
         label: 'Previous Occupation',
         placeholder: 'What did your character do before?',
         description: 'Character\'s job/career before current events',
         type: 'text',
         required: true,
       },
       {
         name: 'education',
         label: 'Education Level',
         placeholder: 'High school, college, etc.',
         description: 'Highest level of education completed',
         type: 'text',
         required: false,
       }
     ],
   }

3. Adding a references section:
   {
     id: 'references',
     title: 'References',
     description: 'People who can vouch for you',
     icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
     fields: [
       {
         name: 'reference1',
         label: 'Reference 1 Discord Username',
         placeholder: '@username#1234',
         description: 'Someone who can vouch for your RP ability',
         type: 'text',
         required: false,
       },
       {
         name: 'reference2',
         label: 'Reference 2 Discord Username',
         placeholder: '@username#1234',
         description: 'Another person who knows your RP style',
         type: 'text',
         required: false,
       }
     ],
   }

4. Adding a rules agreement section:
   {
     id: 'rules',
     title: 'Server Rules Agreement',
     description: 'Confirm you understand our rules',
     icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
     fields: [
       {
         name: 'rulesAccepted',
         label: 'I have read and agree to follow all server rules',
         placeholder: '',
         description: 'You must accept the rules to apply',
         type: 'text', // Note: This would need custom checkbox implementation
         required: true,
         validationMessage: 'You must accept the server rules to continue.',
       }
     ],
   }

Remember to update the form schema generation in whitelist-form.tsx to handle new field types!
*/

export const getAdminDiscordIds = () => applicationConfig.adminDiscordIds
export const getMinimumAge = () => applicationConfig.minimumAge
export const getFormSections = () => applicationConfig.sections
export const getFormField = (sectionId: string, fieldName: string) =>
  applicationConfig.sections
    .find(section => section.id === sectionId)
    ?.fields.find(field => field.name === fieldName)

export const isAdmin = (discordId: string | undefined): boolean => {
  return !!discordId && applicationConfig.adminDiscordIds.includes(discordId)
}