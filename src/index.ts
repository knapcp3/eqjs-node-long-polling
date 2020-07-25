import SkillShareServer from './SkillShareServer/SkillShareServer';
import appRouter from './AppRouter/AppRouter';

const skillShareServer = new SkillShareServer(appRouter);
skillShareServer.start(8000);
