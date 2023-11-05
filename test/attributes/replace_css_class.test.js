import sinon from "sinon"
import { fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("replace_css_class")

describe("replace_css_class", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })
    it('should do nothing and print warning if no "from" were provided', async () => {
      sinon.replace(console, "warn", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning =
        '[TurboPower] no "from" or "to" class provided for Turbo Streams operation "replace_css_class"'

      assert.equal(document.querySelector("#element").getAttribute("from"), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="replace_css_class" classes="" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("from"), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "from" attribute is missing', async () => {
      sinon.replace(console, "warn", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning =
        '[TurboPower] no "from" or "to" class provided for Turbo Streams operation "replace_css_class"'

      assert.equal(document.querySelector("#element").getAttribute("from"), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="replace_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("from"), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context("target", () => {
    it("should replace the css class", async () => {
      await fixture('<div id="element" class="background-blue"></div>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "background-blue")

      await executeStream(
        '<turbo-stream action="replace_css_class" from="background-blue" to="background-red" target="element"></turbo-stream>',
      )
      assert.equal(document.querySelector("#element").getAttribute("class"), "background-red")
    })
  })

  context("targets", () => {
    it("should replace the css class", async () => {
      await fixture(`
        <div id="one" class="background-blue"></div>
        <div id="two" class="background-blue"></div>
        <div id="three" class="background-blue"></div>
      `)

      assert.equal(document.querySelector("#one").getAttribute("class"), "background-blue")
      assert.equal(document.querySelector("#two").getAttribute("class"), "background-blue")
      assert.equal(document.querySelector("#three").getAttribute("class"), "background-blue")

      await executeStream(
        '<turbo-stream action="replace_css_class" from="background-blue" to="background-red" targets="div"></turbo-stream>',
      )
      assert.equal(document.querySelector("#one").getAttribute("class"), "background-red")
      assert.equal(document.querySelector("#two").getAttribute("class"), "background-red")
      assert.equal(document.querySelector("#three").getAttribute("class"), "background-red")
    })
  })
})
