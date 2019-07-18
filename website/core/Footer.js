const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const { baseUrl, docsUrl } = this.props.config;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;

    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const { baseUrl } = this.props.config;

    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer" style={{ padding: '2rem' }}>
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('getting-started')}>Getting Started</a>
            <a href={this.docUrl('api')}>API</a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
