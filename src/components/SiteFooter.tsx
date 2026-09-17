import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Text } = Typography;

export default function SiteFooter() {
  return (
    <Footer className="site-footer">
      <div className="container footer-inner footer-inner-centered">
        <Text className="footer-brand">© Thrifta 2026</Text>
        <Text className="footer-text footer-text-centered">
          Thrifta is a trading name of Thrifta Digital Pvt Ltd.
        </Text>
        <Link to="/dsar" className="footer-link">
          Data Subject Access Request
        </Link>
      </div>
    </Footer>
  );
}
