import React from "react"

import { ScrollUpOnMount } from "helpers"
import { Article, HeaderText } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import OverviewMd from "articles/Home.md"
import DownloadMd from "articles/Download.md"
import ConfigMd from "articles/Configuration.md"
import GridMd from "articles/Grid.md"
import TypeMd from "articles/Typography.md"
import ButtonsMd from "articles/Buttons.md"
import FormsMd from "articles/Forms.md"
import ClassesMd from "articles/Classes.md"
import MixinsMd from "articles/Mixins.md"
import FunctionsMd from "articles/Functions.md"
import ModalsMd from "articles/Modals.md"

export const Template = props => {
  return (
    <div className="articles-wrapper row">
      <ScrollUpOnMount />
      {props.children}
    </div>
  )
}

export const Overview = () => {
  return (
    <div className="column">
      <HeaderText>Overview</HeaderText>
      <Template>
        <Article>{OverviewMd}</Article>
      </Template>
    </div>
  )
}
export const Modals = () => {
  return (
    <div className="column">
      <HeaderText>Modals</HeaderText>
      <Link className="small secondary button has-feather" to="/examples/modals">
        See Examples <ChevronRight size={16} />
      </Link>
      <Template>
        <Article>{ModalsMd}</Article>
      </Template>
    </div>
  )
}
export const Download = () => {
  return (
    <div className="column">
      <HeaderText>Download</HeaderText>
      <Template>
        <Article>{DownloadMd}</Article>
      </Template>
    </div>
  )
}
export const Config = () => {
  return (
    <div className="column">
      <HeaderText>Configuration</HeaderText>
      <Template>
        <Article>{ConfigMd}</Article>
      </Template>
    </div>
  )
}

export const Grid = () => {
  return (
    <div className="column">
      <HeaderText>Grid</HeaderText>
      <Link className="small secondary button has-feather" to="/examples/grid">
        See Examples <ChevronRight size={16} />
      </Link>
      <Template>
        <Article>{GridMd}</Article>
      </Template>
    </div>
  )
}
export const Type = () => {
  return (
    <div className="column">
      <HeaderText>Typography</HeaderText>
      <Link className="small secondary button has-feather" to="/examples/typography">
        See Examples <ChevronRight size={16} />
      </Link>
      <Template>
        <Article>{TypeMd}</Article>
      </Template>
    </div>
  )
}
export const Buttons = () => {
  return (
    <div className="column">
      <HeaderText>Buttons</HeaderText>
      <Link className="small secondary button has-feather" to="/examples/buttons">
        See Examples <ChevronRight size={16} />
      </Link>
      <Template>
        <Article>{ButtonsMd}</Article>
      </Template>
    </div>
  )
}
export const Forms = () => {
  return (
    <div className="column">
      <HeaderText>Forms</HeaderText>
      <Link className="small secondary button has-feather" to="/examples/forms">
        See Examples <ChevronRight size={16} />
      </Link>
      <Template>
        <Article>{FormsMd}</Article>
      </Template>
    </div>
  )
}

export const Classes = () => {
  return (
    <div className="column">
      <HeaderText>Classes</HeaderText>
      <Template>
        <Article>{ClassesMd}</Article>
      </Template>
    </div>
  )
}
export const Mixins = () => {
  return (
    <div className="column">
      <HeaderText>Mixins</HeaderText>
      <Template>
        <Article>{MixinsMd}</Article>
      </Template>
    </div>
  )
}
export const Functions = () => {
  return (
    <div className="column">
      <HeaderText>Functions</HeaderText>
      <Template>
        <Article>{FunctionsMd}</Article>
      </Template>
    </div>
  )
}
