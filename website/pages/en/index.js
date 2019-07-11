const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img
          src={props.img_src}
          alt="Project Logo"
          style={{ width: 300, height: 'auto' }}
        />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a
          className="button"
          href={props.href}
          target={props.target}
          style={props.style}
        >
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src="https://echo.church/wp-content/uploads/2018/01/echo_logo_main_header.png" />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('getting-started')} style={{ fontSize: 18 }}>
              Get Started
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div className="productShowcaseSection paddingBottom">
        <h2 style={{ textAlign: 'center' }}>Features</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: 40,
          }}
        >
          <div>
            <MarkdownBlock>### Cross-platform</MarkdownBlock>
            <MarkdownBlock>Available on both iOS and Android</MarkdownBlock>
          </div>
          <div>
            <MarkdownBlock>### News Feed</MarkdownBlock>
            <MarkdownBlock>The latest Echo news and updates</MarkdownBlock>
          </div>
          <div>
            <MarkdownBlock>### Media</MarkdownBlock>
            <MarkdownBlock>
              Watch live sermons, past series, and other media
            </MarkdownBlock>
          </div>
          <div>
            <MarkdownBlock>### Engage</MarkdownBlock>
            <MarkdownBlock>
              Connect and engage with the Echo like serving and getting baptized
            </MarkdownBlock>
          </div>
          <div>
            <MarkdownBlock>### Groups</MarkdownBlock>
            <MarkdownBlock>
              One of the best ways for you to grow in your journey of faith,
              connect in friendships with others, and serve the world around you
            </MarkdownBlock>
          </div>
          <div>
            <MarkdownBlock>### Giving</MarkdownBlock>
            <MarkdownBlock>
              Contribute financially and be a part of changing people’s lives
              forever
            </MarkdownBlock>
          </div>
        </div>
      </div>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'An app to help echo the message of Jesus to the rest of the world',
            image: `${baseUrl}img/undraw_mobile.svg`,
            imageAlign: 'right',
            title: 'Echo.App',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block>
        {[
          {
            content:
              'Echo Labs exists to use technology to urgently lead people to say YES to Jesus and passionately follow Him',
            image: `${baseUrl}img/undraw_science.svg`,
            imageAlign: 'right',
            title: 'Echo Labs',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: '',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Built with React',
          },
          {
            content: '',
            image: `${baseUrl}img/undraw_fishing.svg`,
            imageAlign: 'top',
            title: 'React Hooks',
          },
          {
            content: '',
            image: `${baseUrl}img/undraw_mobile_app.svg`,
            imageAlign: 'top',
            title: 'Expo Powered',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <Description />
          <LearnHow />
        </div>
      </div>
    );
  }
}

module.exports = Index;
