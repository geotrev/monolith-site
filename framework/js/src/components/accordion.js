"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_EXPANDED: "data-accordion-expanded",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
  ACCORDION_MULTIPLE: "data-accordion-toggle-multiple",
}

const events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const messages = {
  MISSING_ACCORDION_CONTENT:
    "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
  MISSING_ACCORDION_BUTTONS:
    "You have an accordion component with no [data-accordion-button] children.",
}

export default class Accordion extends Utils {
  constructor() {
    super()
    this.accordionContainers = this.findElements(`[${selectors.ACCORDION_CONTAINER}]`)
    this.accordionButtons = this.findElements(`[${selectors.ACCORDION_BUTTON}]`)
    this.accordionContents = this.findElements(`[${selectors.ACCORDION_CONTENT}]`)

    // bind events to calss
    this.getAccordion = this.getAccordion.bind(this)
    this.handleSpaceKeyPress = this.handleSpaceKeyPress.bind(this)
  }

  start() {
    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        button.setAttribute("role", "heading")

        const buttonExpandState =
          button.parentNode.getAttribute("data-accordion-expanded") === "true" ? "true" : "false"
        button.setAttribute("aria-expanded", buttonExpandState)

        button.addEventListener(events.CLICK, this.getAccordion)
        button.addEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        content.setAttribute("role", "region")
        const contentHiddenState = content.parentNode.getAttribute("data-accordion-expanded")
        const toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true"
        content.setAttribute("aria-hidden", toggleContentHiddenState)
      })
    }
  }

  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getAccordion)
      button.removeEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
    })
  }

  getAccordion(event) {
    event.preventDefault()
    this.renderAccordionContent(event)
  }

  renderAccordionContent(event) {
    const button = event.target
    const accordionRow = button.parentNode

    this.container = accordionRow.parentNode
    const accordionContent = button.nextElementSibling
    const accordionContentHasAttr = accordionContent.hasAttribute(selectors.ACCORDION_CONTENT)

    if (!accordionContentHasAttr) {
      throw messages.MISSING_ACCORDION_CONTENT
      return
    }

    const accordionButtonState = accordionRow.getAttribute(selectors.ACCORDION_EXPANDED)
    const accordionContentState = accordionContent.getAttribute(selectors.ACCORDION_CONTENT)
    const accordionContentAriaHiddenState = accordionContent.getAttribute("aria-hidden")

    const toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    const toggleContentState = accordionContentState === "visible" ? "hidden" : "visible"
    const toggleHiddenState = accordionContentAriaHiddenState === "false" ? "true" : "false"

    this.toggleIfMultipleAllowed()

    accordionRow.setAttribute(selectors.ACCORDION_EXPANDED, toggleExpandState)
    accordionContent.setAttribute(selectors.ACCORDION_CONTENT, toggleContentState)
    button.setAttribute("aria-expanded", toggleExpandState)
    accordionContent.setAttribute("aria-hidden", toggleHiddenState)
  }

  handleSpaceKeyPress(event) {
    if (event.which === keyCodes.SPACE) this.getAccordion(event)
  }

  toggleIfMultipleAllowed() {
    if (this.container.hasAttribute(selectors.ACCORDION_MULTIPLE)) return

    const containerId = this.container.getAttribute(selectors.ACCORDION_CONTAINER)
    const containerAttr = `[${selectors.ACCORDION_CONTAINER}='${containerId}']`
    const accordionContentsAttr = `${containerAttr} [${selectors.ACCORDION_CONTENT}]`
    const allAccordionRows = this.findElements(`${containerAttr} [${selectors.ACCORDION_EXPANDED}]`)
    const allAccordionContent = this.findElements(accordionContentsAttr)

    this.toggleChildAttributes(allAccordionRows, selectors.ACCORDION_EXPANDED, "true", "false")
    this.toggleChildAttributes(
      allAccordionContent,
      selectors.ACCORDION_CONTENT,
      "visible",
      "hidden",
    )
  }

  toggleChildAttributes(elements, selector, currentAttr, newAttr) {
    elements.forEach(element => {
      if (element.hasAttribute(selector, currentAttr)) {
        element.setAttribute(selector, newAttr)
      }
    })
  }
}
