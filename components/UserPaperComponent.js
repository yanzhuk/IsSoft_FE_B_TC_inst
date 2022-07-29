import { BaseComponent } from "./index.js";
import { UserPaperTemplate } from "../templates/componentTemplates/index.js";

class UserPaperComponent extends BaseComponent {
    constructor() {
        super('userPaperComponent');
        this.template = UserPaperTemplate;
    }
}

export default (userData) => new UserPaperComponent().render(userData); 
