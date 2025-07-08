import "./styles/reset.css";
import "./styles/styles.css";
import { projects } from "./modules/projects";
import display from "./modules/displayer";
import pubsub from "./modules/PubSub"
import { navMenu } from "./modules/events-handler";

display(projects);
