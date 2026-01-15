import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Nom (branding)',
      type: 'string',
      description: 'Ex: AC Dev : Alexis CHAUVEAU Development',
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'presentation',
      title: 'Présentation',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().min(20),
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      description: 'Ex: Disponible, En poste, Freelance…',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contact',
      title: 'Coordonnées',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).warning(
              'Email invalide',
            ),
        }),
        defineField({
          name: 'phone',
          title: 'Téléphone',
          type: 'string',
        }),
        defineField({
          name: 'location',
          title: 'Zone géographique',
          type: 'string',
          description: 'Ex: Chilly-Mazarin, Île-de-France',
        }),
      ],
    }),

    defineField({
      name: 'links',
      title: 'Mes liens',
      type: 'object',
      fields: [
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),

    defineField({
      name: 'education',
      title: 'Diplômes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'degree',
          title: 'Diplôme',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'school',
              title: 'École',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Année',
              type: 'string',
              description: 'Ex: 2024',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'school' },
            prepare({ title, subtitle }) {
              return { title, subtitle };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'brandName', subtitle: 'status' },
  },
});
