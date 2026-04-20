import { Layout, Typography, Card, Row, Col, Space } from "antd";
import logoIcon from "./assets/logo.png";
import logoText from "./assets/thrifta.png";
import googlePlayBadge from "./assets/google-play.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

type FeatureCardProps = {
  title: string;
  text: string;
};

function FeatureCard({ title, text }: FeatureCardProps) {
  return (
    <Card className="feature-card" bordered={false}>
      <Space direction="vertical" size={6}>
        <Text className="feature-title">{title}</Text>
        <Text className="feature-text">{text}</Text>
      </Space>
    </Card>
  );
}

export default function App() {
  return (
    <Layout className="site-layout">
      <Header className="hero-header">
        <div className="hero-orb hero-orb-right" />
        <div className="hero-orb hero-orb-left" />

        <div className="container">
          <div className="brand-header">
            <img src={logoIcon} alt="Thrifta icon" className="brand-icon" />
            <img src={logoText} alt="Thrifta" className="brand-text-logo" />
          </div>

          <div className="topbar">
            <a href="#about" className="top-link">
              About
            </a>
          </div>

          <Row gutter={[48, 48]} align="middle" className="hero-row">
            <Col xs={24} md={13}>
              <div className="hero-copy">
                <span className="hero-pill">Smart marketplace</span>

                <Title level={1} className="hero-title">
                  Buy and sell with confidence
                </Title>

                <Paragraph className="hero-description">
                  A clean, secure, and easy-to-use marketplace for buying and
                  selling quality new or used items quickly and confidently.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={11}>
              <div className="logo-card">
                <img
                  src={logoIcon}
                  alt="Thrifta logo"
                  className="hero-logo-mark"
                />
                <img
                  src={logoText}
                  alt="Thrifta wordmark"
                  className="hero-logo-text"
                />
                <Paragraph className="logo-note">
                  Your trusted marketplace for simple, secure, and professional
                  buying and selling.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </Header>

      <Content className="main-content">
        <section id="about" className="about-section">
          <div className="container">
            <div className="about-card">
              <Text className="section-label">About</Text>

              <Row gutter={[32, 32]} align="top">
                <Col xs={24} lg={14}>
                  <Title level={2} className="about-title">
                    Designed to make buying and selling feel effortless.
                  </Title>

                  <Paragraph className="about-text">
                    Thrifta is a clean, secure, and easy-to-use marketplace app
                    designed to help you buy and sell new or used items fast.
                    Whether you are decluttering, starting a side hustle, or
                    searching for a great deal, Thrifta makes the process
                    simple, trustworthy, and more professional.
                  </Paragraph>
                </Col>

                <Col xs={24} lg={10}>
                  <Space
                    direction="vertical"
                    size="middle"
                    className="features-stack"
                  >
                    <FeatureCard
                      title="Clean experience"
                      text="Minimal, modern layouts that keep the focus on products and people."
                    />
                    <FeatureCard
                      title="Secure listings"
                      text="Built to support safer transactions and more confident browsing."
                    />
                    <FeatureCard
                      title="Fast and practical"
                      text="Perfect for quick sales, side hustles, and discovering everyday value."
                    />
                  </Space>
                </Col>
              </Row>
            </div>
          </div>
        </section>

        <section className="download-section">
          <div className="container">
            <div className="download-card">
              <Text className="section-label">Get the app</Text>

              <Title level={2} className="download-title">
                Download Thrifta today
              </Title>

              <Paragraph className="download-text">
                Browse listings, post items, and manage your marketplace
                activity anywhere.
              </Paragraph>

              <div className="store-buttons">
                <a
                  href="https://apps.apple.com/us/app/thrifta/id6547851575?itscg=30200&itsct=apps_box_badge&mttnsubad=6547851575"
                  className="store-link"
                  aria-label="Download on the Apple App Store"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1750204800"
                    alt="Download on the App Store"
                    className="store-badge apple-store-badge"
                  />
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.bbdevs.thrifta"
                  className="store-link"
                  aria-label="Get it on Google Play"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="store-badge"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Content>

      <Footer className="site-footer">
        <div className="container footer-inner footer-inner-centered">
          <Text className="footer-brand">© Thrifta 2026</Text>
          <Text className="footer-text footer-text-centered">
            Thrifta is a trading name of Qucavera Ltd.
          </Text>
        </div>
      </Footer>
    </Layout>
  );
}
