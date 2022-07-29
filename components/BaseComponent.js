export class BaseComponent {
    container = document.createElement('div');
    counter = 0;
    constructor(componentName) {
        this.componentName = componentName;
        this.container.classList.add(this.componentName);
    }

    render(params) {
        console.log(`[${this.componentName}] renders ${++this.counter}`);
        this.container.innerHTML = this.template(params);
        return this.container;
    }
}
