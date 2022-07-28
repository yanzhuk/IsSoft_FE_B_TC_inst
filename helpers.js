export function getFormElementValue(formNode, elementName) {
    return formNode.elements[elementName].value;
}

export function clearForm(formNode) {
    for (const element of formNode.elements) {
        element.value = '';
    }
}
