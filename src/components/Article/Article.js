import React, { Component } from 'react';
import './Article.scss';

import Markdown from 'react-markdown';

export default class Article extends Component {
  render() {
    return (
      <article className="article-wrapper">
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    );
  }
}