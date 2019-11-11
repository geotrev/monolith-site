import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import CollapsiblesMd from "app/docs/collapsibles.md"

const Collapsibles = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Collapsibles"
        description="A component for hiding and showing content in an accordion-style user interface."
      />
      <PageHeader>Collapsibles</PageHeader>
      <Article>{CollapsiblesMd}</Article>
    </React.Fragment>
  )
}

export default Collapsibles
