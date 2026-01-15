import { defineField, defineType } from 'sanity';

export const stackItem = defineType({
  name: 'stackItem',
  title: 'Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Langage', value: 'language' },
          { title: 'Framework', value: 'framework' },
          { title: 'Outil', value: 'tool' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'type' },
    prepare({ title, subtitle }) {
      const map: Record<string, string> = {
        language: 'Langage',
        framework: 'Framework',
        tool: 'Outil',
      };
      return { title, subtitle: map[subtitle] ?? subtitle };
    },
  },
});
