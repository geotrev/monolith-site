import Undernet from "../.."
import { find, renderDOM } from "../../helpers/test"
import { Messages } from "../constants"

const dom = `
  <div data-accordion="accordion-id" class="accordion">
    <div class="collapsible" data-collapsible="collapsible-id-1">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-1">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-1">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="collapsible" data-collapsible="collapsible-id-2" data-visible="false">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-2">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-2">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

console.warn = jest.fn()
console.error = jest.fn()

describe("Accordion", () => {
  afterEach(() => Undernet.Accordions.stop())

  describe("API start", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)
    })

    it("sets attributes on collapsibles", () => {
      Undernet.Accordions.start()
      expect(wrapper).toMatchSnapshot()
    })

    it("can open multiple collapsibles initially", () => {
      // Given
      find("[data-collapsible='collapsible-id-2']").removeAttribute("data-visible")
      // When
      Undernet.Accordions.start()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not toggle collapsible", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='collapsible-id-2']")
      // When
      Undernet.Accordions.start()
      Undernet.Accordions.stop()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    it("opens closed collapsible", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='collapsible-id-2']")
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("closes open collapsible", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='collapsible-id-1']")
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    describe("Multiple visible by default", () => {
      let wrapper

      beforeEach(() => {
        wrapper = renderDOM(dom)
        find("[data-collapsible='collapsible-id-2']").removeAttribute("data-visible")
      })

      describe("open collapsible click", () => {
        it("keeps other collapsibles open", () => {
          // Given
          const trigger = find("[data-target='collapsible-id-1']")
          Undernet.Accordions.start()
          // When
          trigger.click()
          // Then
          expect(wrapper).toMatchSnapshot()
        })
      })

      describe("closed collapsible click", () => {
        it("closes other collapsibles", () => {
          // Given
          const trigger = find("[data-target='collapsible-id-1']")
          Undernet.Accordions.start()
          // When
          // close collapsible
          trigger.click()
          // re-open collapsible
          trigger.click()
          // Then
          expect(wrapper).toMatchSnapshot()
        })
      })
    })
  })

  describe("#setToggleMultiple", () => {
    it("retains visible state of unselected collapsibles on click", () => {
      // Given
      const wrapper = renderDOM(dom)
      wrapper.setAttribute("data-toggle-multiple", null)
      const trigger = find("[data-target='collapsible-id-2']")
      Undernet.Accordions.start()
      // When
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })
})

const errorDom = (accordionId = "", parentId = "") => `
  <div data-accordion="${accordionId}" class="accordion">
    <div class="collapsible" data-collapsible="collapsible-id-1">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="${parentId}" data-target="collapsible-id-1">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-1">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="collapsible" data-collapsible="collapsible-id-2">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-2">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-2">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordion Warnings", () => {
  afterEach(() => {
    Undernet.Accordions.stop()
  })

  it("prints console warning if accordion id can't be found", () => {
    // Given
    renderDOM(errorDom("accordion-id", ""))
    const trigger = find("[data-target='collapsible-id-1']")
    // When
    Undernet.Accordions.start()
    trigger.click()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_ACCORDION_ID_ERROR)
  })

  it("prints console warning if there is a mismatch between the number of triggers and collapsibles when trapping focus", () => {
    // Given
    renderDOM(errorDom("accordion-id", ""))
    // When
    Undernet.Accordions.start()
    // Then
    expect(console.warn).toBeCalledWith(
      Messages.TRIGGERS_TO_COLLAPSIBLES_LENGTH_WARNING("accordion-id", 1, 2)
    )
  })

  it("prints console error if accordion element can't be found", () => {
    // Given
    renderDOM(errorDom("", "accordion-id"))
    const trigger = find("[data-target='collapsible-id-1']")
    // When
    Undernet.Accordions.start()
    trigger.click()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_ACCORDION_ERROR("accordion-id"))
  })
})