import DataService from "../services/DataService.js";

export class BaseView {
    container = document.createElement('div');
    counter = 0;
    constructor(viewName) {
        this.viewName = viewName;
        this.container.classList.add(viewName);
        this.DataService = DataService;
        this.addEventListeners();
    }

    getData(params) {
        return params;
    }

    addEventListeners() { }

    createLayout(params) {
        this.container.innerHTML = this.template(params);
        return this.container;
    }

    render(params) {
        console.log(`[${this.viewName}] renders - ${++this.counter}`);

        this.container.innerHTML = '';
        return this.createLayout(params);
    }
}