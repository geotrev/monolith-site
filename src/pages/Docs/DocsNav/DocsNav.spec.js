import DocsNav from './DocsNav';
import { BrowserRouter as Router } from 'react-router-dom';

describe("<DocsNav />", () => {
  it("can render", () => {
    const wrapper = mount(<Router><DocsNav/></Router>);
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.exist
  })

  it("is collapsable/expandable with .docs-nav-expand", () => {
    const wrapper = mount(<Router><DocsNav/></Router>);
    const button = wrapper.find('.docs-nav-expand > a');
    button.simulate('click');
    expect(wrapper).to.include.text('Show Menu');
    button.simulate('click');
    expect(wrapper).to.include.text('Hide Menu');
  })
})