import { type SchemaTypeDefinition } from 'sanity';
import { settings } from './settingsType';
import { stackItem } from './stackItemType';
import { project } from './projectType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, stackItem, project],
};
