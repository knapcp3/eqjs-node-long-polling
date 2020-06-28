import SkillShareServer from './SkillShareServer/SkillShareServer';

const skillShareServer = new SkillShareServer(Object.create(null));
skillShareServer.start(8000);
