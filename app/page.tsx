import HomeSlider from './components/home/HomeSlider';
import { client } from '../sanity/lib/client';
import {
  PROJECTS_QUERY,
  SETTINGS_QUERY,
  STACK_QUERY,
} from '../sanity/lib/queries';

export default async function Page() {
  const [settings, stack, projects] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(STACK_QUERY),
    client.fetch(PROJECTS_QUERY),
  ]);

  return <HomeSlider settings={settings} stack={stack} projects={projects} />;
}
